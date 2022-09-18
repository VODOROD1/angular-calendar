import { CreateCalendarService } from './../services/create-calendar/create-calendar.service';
import { Component, Input, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {Dialog} from '@angular/cdk/dialog';
import { Day } from '../models/day';
import { AppointmentPopupComponent } from '../appointment-popup/appointment-popup.component';
import { DialogService } from '../services/dialog/dialog.service';
import { StateServiceService } from '../services/state/state-service.service';
import { State } from '../models/state';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.less'],
  // providers: [{ provide: Dialog, useExisting: MainCalendarComponent }]
})
export class MainCalendarComponent implements OnInit {
  
  public monthDays: Day[];
  public monthNumber: number;
  public year: number;
  public weekDaysName: string[] = [];
  @Input() state: State;

  constructor(public createCalendar: CreateCalendarService, 
    public dialog: Dialog,
    // public state: StateServiceService,
    private dialogService: DialogService
    ) {

  }

  ngOnInit(): void {
    this.setMonthDays(this.createCalendar.getCurrentMonth());

    this.weekDaysName.push("Mo")
    this.weekDaysName.push("Tu")
    this.weekDaysName.push("We")
    this.weekDaysName.push("Th")
    this.weekDaysName.push("Fr")
    this.weekDaysName.push("Sa")
    this.weekDaysName.push("Su")
  }

  openDialog(monthYear: string, dayNumber: number) {
    const dialogRef = this.dialogService.open(AppointmentPopupComponent, { data: {monthYear, dayNumber} });

    dialogRef.afterClosed().subscribe(() => {
      // Subscription runs after the dialog closes
      console.log('Dialog closed!');
    });
  }

  onNextMonth(): void {
    let monthYear = `${this.monthNumber}_${this.year}`
    debugger;
    this.state.setState(this.monthDays, monthYear);
    this.monthNumber++

    if(this.monthNumber === 13) {
      this.monthNumber = 1;
      this.year++;
    }

    monthYear = `${this.monthNumber}_${this.year}`

    if(this.state.getState().months[monthYear]) {
      this.setMonthDays(this.state.getState().months[monthYear]);
    } else {
      this.setMonthDays(this.createCalendar.getMonth(this.monthNumber, this.year));
    }
  }

  onPreviousMonth(): void {
    let monthYear = `${this.monthNumber}_${this.year}`
    debugger;
    this.state.setState(this.monthDays, monthYear);
    this.monthNumber--

    if(this.monthNumber < 1) {
      this.monthNumber = 12
      this.year--
    }

    monthYear = `${this.monthNumber}_${this.year}`

    if(this.state.getState().months[monthYear]) {
      this.setMonthDays(this.state.getState().months[monthYear]);
    } else {
      this.setMonthDays(this.createCalendar.getMonth(this.monthNumber, this.year));
    }
  }

  private setMonthDays(days: Day[]): void {
    this.monthDays = days;
    debugger;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }

  public choiseDay(day: Day) {
    // day.chosen = true;
    let monthYear = `${this.monthNumber}_${this.year}`
    debugger;
    if(this.state.getState().months[monthYear]) {

    }
    this.state.setState(this.monthDays, monthYear);
    this.openDialog(monthYear, day.number);
  }

}