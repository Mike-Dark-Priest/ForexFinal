import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User = {} as User; // Initialize user as an empty object of type User
  alertMessage: string = '';
  showAlert: boolean = false;
  isForgotPassword: boolean = false;
  newPassword: string = '';
  loading: boolean = false; // Loader state

  constructor(private router: Router, private cognitoService: CognitoService) {}

  ngOnInit(): void {
    console.log('SignInComponent initialized');
  }

  signInWithCognito(): void {
    if (this.user.email && this.user.password) {
      this.loading = true; 
      this.displayAlert('Signing in with Cognito for ' + this.user.email);
      
      this.cognitoService.signIn(this.user)
        .then(() => {
          this.displayAlert('Sign-in successful');
          
          this.cognitoService.getUser().then(user => {
            this.displayAlert('User fetched from Cognito with role: ' + user.roles[0]);
            const role = user.roles[0];
            localStorage.setItem('UserName', user.attributes.given_name);
            localStorage.setItem('userRole',user.roles[0])
            console.log(localStorage.getItem('UserName'));
            console.log(localStorage.getItem('userRole'));

            const navigateToDashboard = role === 'admin' 
              ? '/fxm/admin-dashboard' 
              : '/fxm/user-dashboard';

            this.router.navigate([navigateToDashboard])
              .then(() => {
                // Navigation is complete, stop loading
                this.loading = false;
                this.displayAlert(`Navigation to ${navigateToDashboard} complete.`);
              })
              .catch((error) => {
                // Handle navigation errors if needed
                this.loading = false;
                this.displayAlert('Navigation error: ' + error.message);
              });
          });
        })
        .catch((error: any) => {
          this.displayAlert('Error during sign-in: ' + error.message);
          this.loading = false;
        });
    } else {
      this.displayAlert("Please enter a valid email or password");
    }
  }

  forgotPasswordClicked(): void {
    if (this.user.email) {
      this.cognitoService.forgotPassword(this.user)
        .then(() => {
          this.displayAlert('Verification code sent to ' + this.user.email);
          this.isForgotPassword = true;  // Switch to forgot password view
        })
        .catch((error: any) => {
          this.displayAlert('Error during forgot password: ' + error.message);
        });
    } else {
      this.displayAlert('Please enter a valid email address');
    }
  }
  
  
  newPasswordSubmit(): void {
    if (this.user.email && this.user.code && this.newPassword) {
      this.cognitoService.forgotPasswordSubmit(this.user, this.newPassword)
        .then(() => {
          this.displayAlert('Password reset successfully. Please sign in with your new password.');
          this.isForgotPassword = false;  // Return to sign-in form
        })
        .catch((error: any) => {
          this.displayAlert('Error during password reset: ' + error.message);
        });
    } else {
      this.displayAlert('Please provide all necessary details (email, code, new password)');
    }
  }

  private displayAlert(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
    console.log('Alert displayed:', message);
  }
}
