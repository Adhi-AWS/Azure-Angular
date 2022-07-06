import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'statusIconPipe',
})
export class StatusIconPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    let statusIcon: any = '';

    if (
      ['finished', 'success', 'complete', 'completed'].includes(
        value.toLowerCase()
      )
    ) {
      statusIcon = `<img class="icon-rotate mx-3" src="assets/images/icons/complete_small.png" title="${value}" />`;
    } else if (['failure', 'failed', 'error'].includes(value.toLowerCase())) {
      statusIcon = `<img class="icon-rotate mx-3" src="assets/images/icons/failed_small.png" title="${value}" />`;
    } else if (
      [
        'not started',
        'not_started',
        'not-started',
        'not initiated',
        'not_initiated',
        'not-initiated',
      ].includes(value.toLowerCase())
    ) {
      statusIcon = `<span class="no-status-icon mx-3" title="${value}"></span>`;
    } else if (
      ['in progress', 'in_progress', 'in-progress'].includes(
        value.toLowerCase()
      )
    ) {
      statusIcon = `<img class="icon-rotate mx-3" src="assets/images/icons/loading.png" title="${value}" />`;
    } else if (
      ['in queue', 'in_queue', 'in-queue', 'recieved', 'received'].includes(
        value.toLowerCase()
      )
    ) {
      statusIcon = `<img class="rotate-clock mx-3" src="assets/images/icons/rotate-cw.svg" title="${value}" />`;
    } else {
      statusIcon = `<span>${value}</span>`;
    }

    return statusIcon;
  }
}
