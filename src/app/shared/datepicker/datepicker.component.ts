import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-shared-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
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
export class DatepickerComponent implements OnInit, OnChanges {
  @Input() dateLabel: string | undefined;
  @Input() minDate?: string | undefined;
  @Input() maxDate?: string | undefined;
  @Input() changedEndDate?: string | undefined;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDateSelect = new EventEmitter<any>();

  date = new FormControl(moment());

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.changedEndDate) {
      this.date.setValue(
        moment(changes.changedEndDate.currentValue)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss')
      );
    }
  }

  ngOnInit(): void {
    this.date.setValue(
      this.dateLabel === 'Start Date'
        ? moment().startOf('day')
        : moment().endOf('day')
    );
  }

  dateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.onDateSelect.emit({
      value:
        this.dateLabel === 'Start Date'
          ? moment(event.value).startOf('day').format('YYYY-MM-DD HH:mm:ss')
          : moment(event.value).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    });
  }
}
