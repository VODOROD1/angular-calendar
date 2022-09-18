import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainCalendarComponent } from './main-calendar/main-calendar.component';
import { SpinButtonComponent } from './spin-button/spin-button.component';
import { AppointmentPopupComponent } from './appointment-popup/appointment-popup.component';
import { DialogModule } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainCalendarComponent,
    SpinButtonComponent,
    AppointmentPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkStepperModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
