import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  files: File[] = [];
  showLoader: boolean = false;
  uploadSuccess: boolean = false;
  uploadError: string = '';

  constructor() { }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpload() {
    if (this.files.length === 0) {
      this.uploadError = 'Please select files to upload.';
      return;
    }

    this.uploadError = '';
    this.uploadSuccess = false;
    this.showLoader = true;

    // Simulate file upload with a timeout (Replace this with actual upload logic)
    setTimeout(() => {
      this.showLoader = false;
      this.uploadSuccess = true;
      this.files = []; // Clear files after upload
    }, 2000);
  }
}
