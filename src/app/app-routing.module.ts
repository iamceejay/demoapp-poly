import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableUsersComponent } from './table-users/table-users.component';
import { FormUserComponent } from './form-user/form-user.component';

const routes: Routes = [
  { path: '', component: TableUsersComponent },
  { path: 'user/add', component: FormUserComponent },
  { path: 'user/:userId', component: FormUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
