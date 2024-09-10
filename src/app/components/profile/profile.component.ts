import { Component, OnInit } from '@angular/core';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private cognitoService: CognitoService) { }

  ngOnInit(): void {
    this.cognitoService.getUser().then(user => this.user = user.attributes);
  }

}
