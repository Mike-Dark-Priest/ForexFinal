import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { GenericDashboardComponent } from './home/generic-dashboard/generic-dashboard.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { 
    path: 'fxm', 
    component: GenericDashboardComponent, 
    canActivate: [AuthGuard], 
    children: [
      { 
        path: 'admin-dashboard', 
        component: AdminDashboardComponent, 
        canActivate: [AdminGuard], 
        children: [
          { path: 'upload', component: UploadComponent, canActivate: [AdminGuard] }
        ]
      },
      { 
        path: 'user-dashboard', 
        component: UserDashboardComponent, 
        canActivate: [UserGuard] 
      }
    ]
  },
  { path: '**', redirectTo: 'sign-in', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
