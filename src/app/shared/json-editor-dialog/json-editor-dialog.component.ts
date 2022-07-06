import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import JSONEditor from 'jsoneditor';

@Component({
  selector: 'app-shared-json-editor-dialog',
  templateUrl: './json-editor-dialog.component.html',
  styleUrls: ['./json-editor-dialog.component.scss'],
})
export class JsonEditorDialogComponent implements OnInit, AfterViewInit {
  jsonEditorTitle: string = 'JSON Editor';
  description: string = '';

  @ViewChild('jsonEditor') jsonEditor: ElementRef | undefined;
  editor: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<JsonEditorDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.jsonEditorTitle) {
      this.jsonEditorTitle = this.data.jsonEditorTitle;
    }

    if (this.data.description_field) {
      this.description = this.data.description;
    }
  }

  ngAfterViewInit(): void {
    this.editor = new JSONEditor(
      this.jsonEditor?.nativeElement,
      {
        mode: 'code',
      },
      this.data.payload
    );
  }

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }

  sendPayload(): void {
    const updatedJson = this.data.description_field
      ? {
          description: this.description,
          payload: this.editor.get(),
        }
      : this.editor.get();
    this.close(updatedJson);
  }
}
