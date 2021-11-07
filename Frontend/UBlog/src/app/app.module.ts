import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent} from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HeaderblogComponent } from './plantillas/headerblog/headerblog.component';
import { FooterblogComponent } from './plantillas/footerblog/footerblog.component';
import { HeaderperlfilComponent } from './plantillas/headerperlfil/headerperlfil.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    HeaderblogComponent,
    FooterblogComponent,
    HeaderperlfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    YouTubePlayerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
