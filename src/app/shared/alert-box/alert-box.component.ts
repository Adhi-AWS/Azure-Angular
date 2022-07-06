import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AlertConfig } from './alert.config';

@Component({
  selector: 'app-shared-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBoxComponent implements OnInit {
  @Input() alertMsg: any = {};
  @Input() class: any = '';

  /** If set, displays an inline "Close" button */
  @OnChange() @Input() dismissible = true;

  /** Number in milliseconds, after which alert will be closed */
  @Input() dismissOnTimeout?: number | string;

  /** Is alert visible */
  @Input() isOpen = true;

  /** This event fires immediately after close instance method is called,
   * $event is an instance of Alert component.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClose = new EventEmitter<AlertBoxComponent>();
  /** This event fires when alert closed, $event is an instance of Alert component */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onClosed = new EventEmitter<AlertBoxComponent>();

  classes = '';
  dismissibleChange = new EventEmitter<boolean>();

  constructor(
    _config: AlertConfig,
    private changeDetection: ChangeDetectorRef
  ) {
    Object.assign(this, _config);
    this.dismissibleChange.subscribe((/*dismissible: boolean*/) => {
      this.classes = this.dismissible ? 'alert-dismissible' : '';
      this.changeDetection.markForCheck();
    });
  }

  ngOnInit(): void {
    const timeout = this.alertMsg?.timeout;
    if (timeout) {
      // if alertMsg.timeout used as attr without binding, it will be a string
      setTimeout(() => this.dismiss(), parseInt(timeout as string, 10));
    }
  }

  // todo: animation ` If the .fade and .in classes are present on the element,
  // the alert will fade out before it is removed`
  /**
   * Closes an alert by removing it from the DOM.
   */
  dismiss(): void {
    if (!this.isOpen) {
      return;
    }

    this.onClose.emit(this);
    this.isOpen = false;
    this.changeDetection.markForCheck();
    this.onClosed.emit(this);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function OnChange(): any {
  const sufix = 'Change';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function OnChangeHandler(target: any, propertyKey: string): void {
    const _key = ` __${propertyKey}Value`;
    Object.defineProperty(target, propertyKey, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get(): any {
        // eslint-disable-next-line security/detect-object-injection
        return this[_key];
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(value: any): void {
        // eslint-disable-next-line security/detect-object-injection
        const prevValue = this[_key];
        // eslint-disable-next-line security/detect-object-injection
        this[_key] = value;
        if (prevValue !== value && this[propertyKey + sufix]) {
          this[propertyKey + sufix].emit(value);
        }
      },
    });
  };
}
