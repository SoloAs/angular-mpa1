import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftSidebarComponent } from './shared/left-sidebar/left-sidebar.component';
import { ConfigComponent } from './config/config.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { MediaComponent } from './media/media.component';
import { MonitorComponent } from './monitor/monitor.component';
import { RemoteComponent } from './remote/remote.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSidebarComponent,
    ConfigComponent,
    PageNotFoundComponent,
    MediaComponent,
    MonitorComponent,
    RemoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
