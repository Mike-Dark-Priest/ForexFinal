import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CognitoService } from '../services/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private cognitoService: CognitoService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const user = await this.cognitoService.getUser();
      console.log('User roles:', user.roles);
      if (user.roles.includes('user')) {
        return true;
      } else {
        this.router.navigate(['/admin-dashboard']);
        return false;
      }
    } catch (error) {
      console.error('Error in UserGuard:', error);
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}


