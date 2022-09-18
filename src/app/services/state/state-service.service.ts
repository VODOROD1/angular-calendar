import { Injectable } from '@angular/core';
import { Day } from 'src/app/models/day';
import { State } from 'src/app/models/state';

@Injectable({
  providedIn: 'root'
})


export class StateServiceService {

  constructor() { }

  private state: State = {
    months: {}
  };

  public setAppointment(appointmentDay: Day) {
    debugger;
    let monthYear = appointmentDay.monthIndex + "_" + appointmentDay.year;
    this.state.months[monthYear] = [...this.state.months[monthYear].map((day: Day) => {
      if(day.number === appointmentDay.number) {
        return appointmentDay;
      }
      return day
    })]
  }

  public setState(newMonth: Day[], monthYear: string): void {
    debugger;
    if(this.state.months[monthYear]) {
      this.state.months[monthYear] = [...newMonth.map((day,index) => {
        return this.state.months[monthYear][index]?.appointment ? 
              this.state.months[monthYear][index] :
              day
      })]
    } else {
      this.state.months[monthYear] = newMonth;
    }
  }

  public getState(): State {
    return this.state;
  }

  public getDay(monthYear: string, dayNumber: number): Day {
    let needDay: Day = this.state.months[monthYear].filter((day: Day) => {
      return day.number === dayNumber
    })[0]
    return needDay;
  }
}
