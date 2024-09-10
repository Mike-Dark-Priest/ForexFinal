import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Customer {
  name: string;
  allocationStatus: string;
  cifNumber: string;
  accountNumber: string;
  lastAllocatedDate: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  accountInput: string = '';
  isCustomer: boolean = false;
  customers: Customer[] = [];
  isViewingUpload: boolean = false; 
  filteredCustomers: Customer[] = [];
  showLoader: boolean = false;
  files: File[] = [];
  selectedAccountNumber: string  = '';
  inputError: string = '';

  private apiUrl = 'https://0u90hz3ya5.execute-api.us-east-1.amazonaws.com/dev/customer-details'; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log('AdminDashboardComponent initialized.');
  }

  enquire() {
    this.inputError = ''; 
    if (!this.accountInput.trim()) {
      this.inputError = 'Please enter an account or CIF number.';
      return;
    }
  
    this.showLoader = true;
    this.getCustomerDetails(this.accountInput).subscribe((response: any) => { // Expecting the full response object
      console.log(response);
      
      const data = response.message; 
      
     console.log('Received response:', data);
  
      if (data && data.cifNumber === this.accountInput) { 
        this.filteredCustomers = [data]; 
        this.isCustomer = true;
      } else {
        this.inputError = 'No results found. Please check your input.';
      }
  
      this.showLoader = false;
    }, (error) => {
      this.showLoader = false;
      this.inputError = 'An error occurred while fetching customer details.';
      console.error('Error fetching customer details:', error);
    });
  }
  

  getCustomerDetails(cifNumber: string): Observable<Customer[]> {
    const requestBody = JSON.stringify({ cifNumber }); 
    console.log('Sending request to API:', requestBody); 

    return this.http.post<Customer[]>(this.apiUrl, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(error => {
        console.error('Error fetching customer details:', error); 
        return of([]);
      })
    );
  }

  clearSearch() {
    this.accountInput = '';
    this.filteredCustomers = [];
    this.isCustomer = false;
    this.selectedAccountNumber = '';
    this.inputError = '';
  }

  onSelectCustomer(accountNumber: string) {
    this.selectedAccountNumber = accountNumber;
    console.log(this.selectedAccountNumber);
  }

  proceed() {
    if (!this.selectedAccountNumber) {
      return;
    }
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
      this.isCustomer = false;
      this.filteredCustomers = [];
      this.isViewingUpload = true;
    }, 2000);
  }

  backToEnquire() {
    this.isViewingUpload = false;
    this.isCustomer = false;
    this.filteredCustomers = [];
    this.accountInput = '';
    this.selectedAccountNumber = '';
    this.inputError = '';
  }

  allPermitted(): boolean {
    return this.filteredCustomers.every(customer => customer.allocationStatus === 'Permitted');
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpload() {
    if (!this.selectedAccountNumber) {
      alert('Please select a customer before uploading.');
      return;
    }

    if (this.files.length === 0) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('accountNumber', this.selectedAccountNumber); 
    formData.append('file', this.files[0]);

    // Simulate an upload process (this would be a POST request to your API)
    console.log("Uploading the following data:");
    console.log("Account Number:", this.selectedAccountNumber);
    console.log("File:", this.files[0]);

    // Simulate upload response (dummy)
    setTimeout(() => {
      alert('File uploaded successfully.');
      this.files = []; 
      this.selectedAccountNumber = ''; 
      this.isViewingUpload = false;
    }, 2000);
  }
}
