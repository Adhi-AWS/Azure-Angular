import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ViewJsonDialogComponent } from '../view-json-dialog/view-json-dialog.component';

@Component({
  selector: 'app-shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: any;
  @Input() columns: any[] = [];
  @Input() isPagination: boolean = true;
  @Input() isFilter: boolean = true;
  @Input() isEdit: boolean = true;
  @Input() isDelete: boolean = true;
  @Input() isThreeDots: boolean = false;

  @Output() valueClick = new EventEmitter();
  @Output() editAction = new EventEmitter();
  @Output() deleteAction = new EventEmitter();
  @Output() v3dotsAction = new EventEmitter();
  @Output() changepasswordAction = new EventEmitter();
  @Output() mapAdapter = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  displayedColumns: string[] = [];
  dataSource: any;

  tmpCloudProviderList: string[] = [
    'azure',
    'aws',
    'gcp',
    'openstack',
    'redhatopenstack',
    'vmware',
    'ansible'
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((item: any) => item.colRefName);

    this.dataSource = new MatTableDataSource([...this.data]);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    const dataChange: SimpleChange = changes.data;
    if (
      !dataChange.firstChange &&
      JSON.stringify(dataChange.previousValue) !==
        JSON.stringify(dataChange.currentValue)
    ) {
      this.dataSource = new MatTableDataSource([...dataChange.currentValue]);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  valueCategory(value: any, col: any): string {
    if (['action', 'actions'].includes(col.colRefName)) {
      return 'actionIcons';
    } else if (['password'].includes(col.colRefName)) {
      return 'password';
    } else if ([null, undefined, 'null', 'undefined'].includes(value)) {
      return 'empty';
    } else if (col.isAnchorLink) {
      return 'anchorLink';
    } else if (typeof value === 'boolean') {
      return 'boolValue';
    } else if (col.showAsChips) {
      return 'showChips';
    } else if (['status', 'current_status'].includes(col.colRefName)) {
      return 'statusIcon';
    } else if (['cloud_provider'].includes(col.colRefName)) {
      return 'cloudProviderLogo';
    } else if (typeof value === 'object') {
      return 'jsonObj';
    } else if (typeof value === 'string') {
      try {
        const parsedValue = JSON.parse(value);
        if (!parsedValue) {
          return 'empty';
        } else if (parsedValue && typeof parsedValue === 'object') {
          return 'stringifiedJson';
        } else {
          if (value.length > 31) {
            return 'longString';
          }
          return 'shortString';
        }
      } catch (e) {
        if (value.length > 31) {
          return 'longString';
        }
        return 'shortString';
      }
    }

    return '  ';
  }

  anchorClick(row: any): void {
    this.valueClick.emit(row);
  }

  maskedPassword(value: string): string {
    return '*'.repeat(value.length);
  }

  jsonStringfied(json: any): string {
    return JSON.stringify(json);
  }

  mapAdapterClick(row: any): void {
    this.mapAdapter.emit(row);
  }

  editClick(row: any): void {
    this.editAction.emit(row);
  }

  deleteClick(row: any): void {
    this.deleteAction.emit(row);
  }

  v3dotsClick(row: any): void {
    this.v3dotsAction.emit(row);
  }
  
  changepasswordClick(row: any): void {
    this.changepasswordAction.emit(row);
  }
  openViewJsonDialog(colName: string, value: any, category: string): void {
    let viewValue: any;
    switch (category) {
      case 'jsonObj':
        viewValue = value;
        break;
      case 'longString':
        viewValue = value;
        break;
      case 'stringifiedJson':
        viewValue = JSON.parse(value);
        break;
      default:
        viewValue = value;
        break;
    }
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    this.dialog.open(ViewJsonDialogComponent, {
      minWidth: '50%',
      data: {
        title: colName,
        data: viewValue,
      },
    });
  }
}
