import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
    Amplify.configure({
      Auth: {
        region: environment.cognito.region,
        userPoolId: environment.cognito.userPoolId,
        userPoolWebClientId: environment.cognito.userPoolWebClientId,
      }
    });
  }


  

  public async signUp(user: User): Promise<any> {
    try {
      const result = await Auth.signUp({
        username: user.email,
        password: user.password,
        attributes: {
          email: user.email,
          given_name: user.givenName,
          family_name: user.familyName,
        }
      });
      return result;
    } catch (error) {
      console.error('Error during sign up', error);
      throw error;
    }
  }

  public async confirmSignUp(user: User): Promise<any> {
    try {
      const result = await Auth.confirmSignUp(user.email, user.code);
      return result;
    } catch (error) {
      console.error('Error during confirmation', error);
      throw error;
    }
  }

  public async signIn(user: User): Promise<any> {
    try {
      const result = await Auth.signIn(user.email, user.password);
      console.log('Sign-in successful:', result);
      return result;
    } catch (error) {
      console.error('Error during sign in', error);
      throw error;
    }
  }

  public async getUser(): Promise<any> {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      console.log('Current Authenticated User:', currentUser);

      const groups = currentUser.getSignInUserSession().getIdToken().payload['cognito:groups'] || [];
      console.log('User Groups (Roles):', groups);

      const attributes = await Auth.userAttributes(currentUser);
      console.log('Fetched attributes:', attributes);

      const userAttributes: { [key: string]: string } = {};
      attributes.forEach(attr => {
        userAttributes[attr.Name] = attr.Value;
      });

      return {
        id: currentUser.getUsername(),
        username: currentUser.getUsername(),
        roles: groups,
        attributes: userAttributes
      };
    } catch (error) {
      console.error('Error getting user attributes', error);
      throw error;
    }
  }

  public async signOut(): Promise<any> {
    try {
      await Auth.signOut();
      console.log('Sign-out successful');
    } catch (error) {
      console.error('Error during sign out', error);
      throw error;
    }
  }

  public async forgotPassword(user: User): Promise<any> {
    try {
      const result = await Auth.forgotPassword(user.email);
      return result;
    } catch (error) {
      console.error('Error during forgot password', error);
      throw error;
    }
  }

  public async forgotPasswordSubmit(user: User, newPassword: string): Promise<any> {
    try {
      const result = await Auth.forgotPasswordSubmit(user.email, user.code, newPassword);
      return result;
    } catch (error) {
      console.error('Error during forgot password submission', error);
      throw error;
    }
  }

  public async assignRole(user: User): Promise<any> {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(currentUser, {
        'custom:role': user.role
      });
      console.log('Role assigned successfully:', result);
      return result;
    } catch (error) {
      console.error('Error during role assignment', error);
      throw error;
    }
  }

  public getUserPoolId(): string {
    return environment.cognito.userPoolId;
  }
}
