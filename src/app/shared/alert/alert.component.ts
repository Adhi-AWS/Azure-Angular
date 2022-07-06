import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertState } from 'src/app/models/alert.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { AlertService } from 'src/app/services/alert.service';

/**
 * @description Alert Component
 */
@Component({
  selector: 'app-shared-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0.3 }),
        animate('0.1s ease-out', style({ opacity: 0.5 })),
      ]),
      transition(':leave', [
        style({ opacity: 0.5 }),
        animate('0.1s ease-in', style({ opacity: 0.3 })),
      ]),
    ]),
  ],
})
export class AlertComponent implements OnDestroy, OnInit {
  // Alert type and visibility flags
  visible: boolean | undefined;
  showOverlay: boolean | undefined;
  isMessage: boolean | undefined;
  isConfirm: boolean | undefined;
  isProgress: boolean | undefined;
  isLoading: boolean | undefined;
  isSuccess: boolean | undefined;
  progressValue: number | undefined;
  indeterminate: boolean | undefined;
  confirmYesText: string | boolean | undefined;
  confirmNoText: string | boolean | undefined;
  messageButtonText: string | boolean | undefined;
  duration: number | undefined;
  confirmCallback: Function | null | undefined;
  isMarkdownText: boolean | undefined;

  // Data for alert
  titleMessage: string | undefined;
  message: string | string[] | null | undefined;

  // Alert state observer
  private alertStateChanged: Subscription | undefined;

  /**
   * @description Creates an instance of alert component.
   * @param alertService - an instance of AlertService
   * @param change - an instance of ChangeDetectorRef
   */
  constructor(
    private alertService: AlertService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initiateAlertParams();
    this.handleAlertStates();
  }

  /**
   * @description will initiate AlertParams.
   */
  private initiateAlertParams(): void {
    this.visible = false;
    this.showOverlay = false;
    this.isMessage = false;
    this.isConfirm = false;
    this.isProgress = false;
    this.isLoading = false;
    this.isSuccess = false;
    this.progressValue = 100;
    this.indeterminate = false;
    this.confirmYesText = false;
    this.confirmNoText = false;
    this.duration = 0;
    this.confirmCallback = null;
    this.messageButtonText = false;
    this.message = '';
    this.titleMessage = '';
    this.isMarkdownText = false;
  }

  /**
   * @description will handle alert changes.
   */
  private handleAlertStates(): void {
    this.alertStateChanged = this.alertService.alertState.subscribe(
      (state: AlertState) => {
        this.visible = state.show;
        this.isMessage = state.isMessage || false;
        this.isConfirm = state.isConfirm || false;
        this.showOverlay = state.showOverlay || false;
        this.isProgress = state.isProgress || false;
        this.isLoading = state.isLoading || false;
        this.isSuccess = state.isSuccess;
        this.indeterminate = state.indeterminate || false;
        this.progressValue = state.progressValue || 100;
        this.confirmYesText = state.confirmYesText || false;
        this.confirmNoText = state.confirmNoText || false;
        this.confirmCallback = state.confirmCallback || null;
        this.message = state.message;
        this.messageButtonText = state.messageButtonText || false;
        this.titleMessage = state.titleMessage;
        this.isMarkdownText = state.isMarkdownText || false;
        if (this.showOverlay) {
          document
            .getElementsByTagName('html')[0]
            .setAttribute('style', 'overflow: hidden;');
        }
        this.change.detectChanges();
      }
    );
  }

  /**
   * @description will handle the user confirmation and will pass the result in callback.
   * @param state contain selected value by the user.
   */
  confirm(state: boolean): void {
    this.visible = false;
    this.showOverlay = false;
    this.message = '';
    this.confirmYesText = false;
    this.confirmNoText = false;
    this.messageButtonText = false;
    this.isMarkdownText = false;
    this.isConfirm = false;
    if (this.confirmCallback !== null) {
      if (this.confirmCallback) {
        this.confirmCallback(state);
      }
      this.alertService.hide();
    }
  }

  /**
   * @description Closes the alert dialogue.
   */
  close(): void {
    if (this.isProgress || this.isLoading) {
      return;
    }
    this.confirm(false);
    this.alertService.hide();
  }

  ngOnDestroy(): void {
    if (this.alertStateChanged) {
      this.alertStateChanged.unsubscribe();
    }
  }
}
