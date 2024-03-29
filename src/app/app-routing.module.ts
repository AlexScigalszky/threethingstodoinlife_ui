import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { IndexComponent } from './pages/index/index.component';
import { AuthGuard } from './guards/auth.guard';
import { TodosComponent } from './pages/todos/todos.component';

const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [AuthGuard],
  },
  // Fallback when no prior routes is matched
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
