import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-section',
  templateUrl: './upload-section.component.html',
  styleUrls: ['./upload-section.component.scss']
})
export class UploadSectionComponent {
  @Input() selectedAccountNumber: string = '';
  @Output() back = new EventEmitter<void>();
  files: File[] = [];
  extractedData: any = {}; // Removed initial branch value to avoid duplication
  isDataEditable: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
  isUploadSectionVisible: boolean = true;
  isLoading: boolean = false; 
  isExtracting: boolean = false; 
  extractionProgress: number = 0;
  base64FileContent: string | null = null; 

  constructor(private http: HttpClient) {}

  generateUUID(): string {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);

    array[6] = (array[6] & 0x0f) | 0x40;
    array[8] = (array[8] & 0x3f) | 0x80;

    const bytesToHex = (byteArray: Uint8Array): string => {
      return Array.from(byteArray)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
    };

    const uuid = [
      bytesToHex(array.slice(0, 4)),
      bytesToHex(array.slice(4, 6)),
      bytesToHex(array.slice(6, 8)),
      bytesToHex(array.slice(8, 10)),
      bytesToHex(array.slice(10, 16))
    ].join('-');

    return uuid;
  }

  onSelect(event: any) {
    const selectedFiles: File[] = event.target.files || event.addedFiles;
    if (selectedFiles && selectedFiles.length > 0) {
      for (const file of selectedFiles) {
        this.files.push(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageUrl = reader.result;
          this.base64FileContent = (reader.result as string).split(',')[1];
        };
        console.log('Files selected:', this.files);
      }
    }
  }

  backToEnquire() {
    this.back.emit();
  }

  onRemove(file: File) {
    this.files.splice(this.files.indexOf(file), 1);
    this.imageUrl = null;
    this.base64FileContent = null;
    console.log('Files after removal:', this.files);
  }

  onUpload() {
    if (this.files.length === 0 || !this.selectedAccountNumber) {
      return;
    }

    this.isLoading = true;

    const file = this.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result as string;
      this.base64FileContent = base64String.split(',')[1];
      const payload = {
        fileName: file.name,
        accountNumber: this.selectedAccountNumber,
        fileBuffer: this.base64FileContent
      };

      const uploadUrl = 'https://0u90hz3ya5.execute-api.us-east-1.amazonaws.com/dev/fxfiles';

      console.log('payload:', payload);

      this.http.post(uploadUrl, payload).subscribe({
        next: (response: any) => {
          console.log('Upload successful:', response);

          this.isLoading = false;
          this.isExtracting = true;

          this.simulateExtraction(() => {
            if (response.statusCode === 200 && response.message) {
              this.extractedData = response.message;
              this.isDataEditable = true;
              this.isUploadSectionVisible = false;
            }
            this.isExtracting = false;
          });
        },
        error: (error) => {
          console.error('Upload failed:', error);
          alert('Upload failed. Please try again.');
          this.isLoading = false;
        }
      });
    };

    reader.onerror = (error) => {
      console.error('File reading failed:', error);
      alert('File reading failed. Please try again.');
      this.isLoading = false;
    };
  }

  simulateExtraction(callback: () => void) {
    this.extractionProgress = 0;
    const interval = setInterval(() => {
      if (this.extractionProgress < 100) {
        this.extractionProgress += 10;
      } else {
        clearInterval(interval);
        callback();
      }
    }, 200);
  }

  onSubmitEditedData() {
    console.log('Constructed Data:', this.extractedData);

    const applicationApiUrl = 'https://0u90hz3ya5.execute-api.us-east-1.amazonaws.com/dev/application';

    
    const payload = {
      application_id: this.generateUUID(), 
      customer_id: this.selectedAccountNumber,
      status: 'initial',
      submission_date: new Date().toISOString(), 
      
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString(), 
      branch: this.extractedData.branch, 
      address: this.extractedData.address,
      date: this.extractedData.date,
      amount: this.extractedData.amount,
      accountName: this.extractedData.accountName,
      accountNumber: this.extractedData.accountNumber,
      cardNumber: this.extractedData.cardNumber,
      paymentMode: this.extractedData.paymentMode,
      document_id: this.generateUUID(), 
      file_name: this.files[0]?.name ,
      file_url: this.extractedData.fileUrl, 
      upload_date: new Date().toISOString(),
      rejected_date: 'null',
      approved_date: "null",
    };
    console.log(payload);

    this.http.post(applicationApiUrl, payload).subscribe({
      next: (response) => {
        console.log('Data submitted successfully:', response);
        this.isDataEditable = false;
      },
      error: (error) => {
        console.error('Data submission failed:', error);
        alert('Data submission failed. Please try again.');
      }
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
