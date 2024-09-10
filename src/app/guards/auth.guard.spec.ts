import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CognitoService } from '../services/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cognitoService: CognitoService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const user = await this.cognitoService.getUser();
      if (user) {
        return true;
      } else {
        this.router.navigate(['/sign-in']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
