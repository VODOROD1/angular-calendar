import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Day } from '../models/day';
import { DialogData } from '../models/dialog-data';
import { DialogRef } from '../services/dialog/dialog-ref';
import { DIALOG_DATA } from '../services/dialog/dialog-tokens';
import { StateServiceService } from '../services/state/state-service.service';

@Component({
  selector: 'app-appointment-popup',
  templateUrl: './appointment-popup.component.html',
  styleUrls: ['./appointment-popup.component.less'],
  // providers: [{ provide: DIALOG_DATA, useValue: {} }]
})

export class AppointmentPopupComponent implements OnInit {

  form: FormGroup;
  day: Day;
  constructor(
    private dialogRef: DialogRef,
    public state: StateServiceService,
    @Inject(DIALOG_DATA) public dayAttrs: {
      monthYear: string, dayNumber: number
    }
  ) {
    console.log(dayAttrs)
    debugger;
  }

  ngOnInit() {
    this.day = this.state.getDay(this.dayAttrs.monthYear, this.dayAttrs.dayNumber);
    let dayTitle = this.day.appointment ? this.day.appointment.title : ''
    let description = this.day.appointment ? this.day.appointment.description : ''
    debugger;
    this.form = new FormGroup({
      title: new FormControl(dayTitle, Validators.required),
      description: new FormControl(description,Validators.required)
    })
  }

  close() {
    this.dialogRef.close();
  }

  erase() {

  }

  submitPopup() {
    let formData = {
      title: this.form.get('title'),
      description: this.form.get('description')
    }

    let appointmentDay: Day = {...this.day, 
      chosen: true,
      appointment: {
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value
      }
    }
    
    this.state.setAppointment(appointmentDay)
    this.close()
  }
}
