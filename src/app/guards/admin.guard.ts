import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CognitoService } from '../services/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private cognitoService: CognitoService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const user = await this.cognitoService.getUser();
      console.log('User roles:', user.roles);
      if (user.roles.includes('admin')) {
        return true;
      } else {
        this.router.navigate(['/user-dashboard']);
        return false;
      }
    } catch (error) {
      console.error('Error in AdminGuard:', error);
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
