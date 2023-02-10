import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { IndexComponent } from './pages/index/index.component';
import { AuthGuard } from './guards/auth.guard';

// const routes: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  // Fallback when no prior routes is matched
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
