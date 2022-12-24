import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpacecraftComponent } from './components/spacecraft/spacecraft.component';
import { TypeComponent } from './components/type/type.component';
import { GasComponent } from './components/gas/gas.component';

@NgModule({
  declarations: [
    AppComponent,
    SpacecraftComponent,
    TypeComponent,
    GasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
