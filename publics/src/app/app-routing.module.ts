import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserformComponent } from './userform/userform.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routeConfig: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserformComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routeConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
