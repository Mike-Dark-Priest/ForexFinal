import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userPermissions!: any;
  userPermissionsIncludes!: any;
  userEbhubRoles!: any;
  digitalPortalSpecialRoles!: any;
  loanGenerationDeductatSource!: any;
  userRole!: any;
  isAdmin:boolean=false;
  isUser:boolean=false;

  constructor() { }

  ngOnInit(): void {
  
    this.userRole=localStorage.getItem('UserRole');
    console.log("11111111111111111111111111111"+this.userRole);
    if (this.userRole == "admin") {
      this.isAdmin=true;
    }
    if (this.userRole == "user") {
      this.isUser=true;
    }
  }

}
