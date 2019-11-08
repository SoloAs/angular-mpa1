import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { MediaComponent } from './media/media.component';
import { RemoteComponent } from './remote/remote.component';
import { MonitorComponent } from './monitor/monitor.component';



const routes: Routes = [
  { path: 'config', component: ConfigComponent },
  { path: 'media', component: MediaComponent },
  { path: 'remote', component: RemoteComponent },
  { path: 'monitor', component: MonitorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
