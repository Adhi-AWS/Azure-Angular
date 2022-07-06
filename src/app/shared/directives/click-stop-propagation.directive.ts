import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickStopPropagation]',
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ClickStopPropagation {
  @HostListener('click', ['$event'])
  onClick(event: any): void {
    event.stopPropagation();
  }
}
