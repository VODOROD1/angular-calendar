export interface Day {
    number: number;
    chosen: boolean;
    year: number;
    month: string;
    monthIndex: number;
    weekDayName: string;
    weekDayNumber: number;
    appointment?: {
        title: string,
        description: string
    }
}

// export class DayClass implements Day {
//     constructor() {

//     }
// }
