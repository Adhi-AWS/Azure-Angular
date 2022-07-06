import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM-YYYY',
  },
  display: {
    dateInput: 'MMM YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-shared-month-datepicker',
  templateUrl: './month-datepicker.component.html',
  styleUrls: ['./month-datepicker.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthDatepickerComponent  {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onMonthSelect = new EventEmitter<any>();

  date = new FormControl(moment());

  constructor() {}

  chosenYearHandler(normalizedYear: any): void {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: any, datepicker: any): void {
    const ctrlValue = this.date.value;
    const m = normalizedMonth.month();
    ctrlValue.month(m);
    this.date.setValue(ctrlValue);
    const startOfMonth = moment(ctrlValue)
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = moment(ctrlValue)
      .endOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    this.onMonthSelect.emit({
      startOfMonth: startOfMonth,
      endOfMonth: endOfMonth,
    });
    datepicker.close();
  }
}
