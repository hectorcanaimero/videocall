import { UserComponent } from './layout/user/user.component';
import { DashComponent } from './layout/dash/dash.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './layout/signin/signin.component';
import { RoomComponent } from './layout/room/room.component';
import { VideoComponent } from './layout/video/video.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'login', component: SigninComponent },
  { path: 'painel', component: DashComponent },
  { path: 'users', component: UserComponent },
  { path: 'room', component: RoomComponent },
  { path: 'room/:id', component: VideoComponent},
  { path: '***', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
