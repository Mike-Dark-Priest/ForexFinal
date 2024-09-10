import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ProfilePictureService } from '../../../core/services/profile-picture.service';
// import { GlobalConstants } from '../../../common/global-constants';
// import { VaultService } from '../../../core/services/vault.auth.service';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({ 
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  profileName!: any;
  profilePicture: any
  className: any

  VaultAPIToken!: any;
  VaultEndPoint!: any;

  constructor(@Inject(DOCUMENT) private document: Document,  private domSanitizer: DomSanitizer, private router: Router) { }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll($event: any) {
    const offset = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;

    if (offset > 0) {
      this.className = "navbar-glass-shadow"
    } else {
      this.className = ""
    }
  }

  ngOnInit(): void {
    // this.profileName = JSON.parse(localStorage.getItem('user_data') || "")
    // this.profileName = this.profileName.data.user.displayname;

    // get the vault settings by default
    // this.vaultService.getVaultJSON().subscribe(data => {
    //   this.VaultAPIToken = data.VaultAPIToken
    //   this.VaultEndPoint = data.VaultEndPoint

    //   this.vaultService.getVaultAuthToken(this.VaultAPIToken, this.VaultEndPoint).subscribe(getTokenResponse => {
    //     if (getTokenResponse.statuscode == '200') {
    //       //get the PassportAuthAPIEndpoingSecrets data for the  Unayo rewards connection string
    //       // this.vaultService.getVaultSecretData(getTokenResponse.authorizationtoken, GlobalConstants.PassportAuthAPIEndpoingSecrets, this.VaultAPIToken, this.VaultEndPoint).subscribe(
    //         // PassportAuthAPIEndpoingSecrets => {
    //         //   if (PassportAuthAPIEndpoingSecrets.statuscode == '200') {
    //         //     //get PictureGraphMS365APIEndpoingSecrets for the api token for the database
    //         //     this.vaultService.getVaultSecretData(getTokenResponse.authorizationtoken, GlobalConstants.PictureGraphMS365APIEndpoingSecrets, this.VaultAPIToken, this.VaultEndPoint).subscribe(PictureGraphMS365APIEndpoingSecrets => {
    //         //       if (PictureGraphMS365APIEndpoingSecrets.statuscode == '200') {
    //         //         this.ProfilePictureService.getProfilePicture(PictureGraphMS365APIEndpoingSecrets['vaultdata']['url'], PassportAuthAPIEndpoingSecrets['vaultdata']['url']).subscribe(data => {
    //         //           this.profilePicture = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + data);
    //         //         })
    //         //       }
    //         //     });
    //         //   }
    //         // });
    //     }
    //   });
    // })
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('access_token');
    localStorage.removeItem('ebhubspecialroles');
    this.router.navigate(['/']);
  }

}
