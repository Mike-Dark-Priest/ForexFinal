import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { FooterComponent } from './home/footer/footer.component';
import { GenericDashboardComponent } from './home/generic-dashboard/generic-dashboard.component';
import { HeaderComponent } from './home/header/header.component';
import { SearchComponent } from './home/search/search.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { CognitoService } from './services/cognito.service';
import { UploadSectionComponent } from './upload-section/upload-section.component';
import { UploadComponent } from './upload/upload.component';




@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    MessageModalComponent,
    GenericDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    FooterComponent,
    UploadComponent,
    UploadSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    NgxDropzoneModule,
    HttpClientModule
  ],
  providers: [CognitoService, AuthGuard, AdminGuard, UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }





