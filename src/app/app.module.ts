import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiculosListComponent } from './vehiculos-list/vehiculos-list.component';
import { VehiculosDetailsComponent } from './vehiculos-details/vehiculos-details.component';
import { FormsModule } from '@angular/forms';
import { GeneralListComponent } from './general-list/general-list.component';
import { GeneralDetailsComponent } from './general-details/general-details.component';

@NgModule({
  declarations: [
    AppComponent,
    VehiculosListComponent,
    VehiculosDetailsComponent,
    GeneralListComponent,
    GeneralDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
