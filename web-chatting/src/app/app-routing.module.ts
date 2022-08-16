import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './chatting-svc/layout/login/login.component';
import {ChattingComponent} from './chatting-svc/layout/chatting/chatting.component';
import {MainComponent} from './chatting-svc/layout/main/main.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'chatting', component: ChattingComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
