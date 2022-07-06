import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-keyvalue-table',
  templateUrl: './keyvalue-table.component.html',
  styleUrls: ['./keyvalue-table.component.scss'],
})
export class KeyValueTableComponent  {
  @Input() data: any = {};

  constructor() {}
  

  valueCategory(value: any): string {
    if (value === null || value === undefined) {
      return 'empty';
    } else if (typeof value === 'object') {
      return 'jsonObj';
    } else if (typeof value === 'string') {
      try {
        const parsedValue = JSON.parse(value);
        if (parsedValue === null || parsedValue === undefined) {
          return 'empty';
        } else if (!parsedValue && typeof parsedValue === 'object') {
          return 'stringifiedJson';
        } else {
          return 'other';
        }
      } catch (e) {
        return 'other';
      }
    } else {
      return 'other';
    }
  }

  parseJson(value: any): any {
    return JSON.parse(value);
  }
}
