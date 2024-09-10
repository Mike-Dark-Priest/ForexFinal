import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User | undefined;
  isConfirm: boolean = false;
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(private router: Router, private cognitoService: CognitoService) { }

  ngOnInit(): void {
    this.user = {} as User;
    this.isConfirm = false;
  }

  /**
   * signUpWithCognito
   */
  public signUpWithCognito() {
    if (this.user && this.user.email && this.user.password) {
      this.cognitoService.signUp(this.user)
        .then(() => {
          this.isConfirm = true;

          // Ensure role assignment after signup
          this.user!.role = 'user'; // or 'admin' based on logic
          this.cognitoService.assignRole(this.user!).then(() => {
            console.log('Role assigned successfully');
          }).catch((error) => {
            this.displayAlert('Error assigning role: ' + error.message);
            console.error('Error assigning role:', error);
          });
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
          console.error('Sign-up error:', error);
        });
    } else {
      this.displayAlert("Missing email or password");
    }
  }

  /**
   * confirmSignUp
   */
  public confirmSignUp() {
    if (this.user) {
      this.cognitoService.confirmSignUp(this.user)
        .then(() => {
          this.router.navigate(['/sign-in']);
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
          console.error('Confirm sign-up error:', error);
        });
    } else {
      this.displayAlert("Missing User Information");
    }
  }

  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
}
