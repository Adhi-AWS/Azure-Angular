import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { ManageQueueService } from 'src/app/services/manage-queue.service';

@Component({
  selector: 'app-map-adapter-dialog',
  templateUrl: './map-adapter-dialog.component.html',
  styleUrls: ['./map-adapter-dialog.component.scss'],
})
export class MapAdapterDialogComponent implements OnInit {
  cloud_provider_list: any[] = [];

  mapAdapterForm: FormGroup = new FormGroup({
    cloud_provider: new FormControl(
      [...this.data.payload.mapping_names],
      Validators.required
    ),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<MapAdapterDialogComponent>,
    private adminService: AdminService,
    private manageQueueService: ManageQueueService
  ) {}

  ngOnInit(): void {
    this.manageQueueService.getAdapters().subscribe(
      (response: any) => {
        if (response) {
          this.cloud_provider_list = [...response.data];
        }
      },
      (error: any) => {}
    );
  }

  get mapAdapterValue(): any {
    return this.mapAdapterForm.value;
  }

  mapAdapter(): void {
    const payload: any = {
      data: [],
      modified_by: this.adminService.getUsername(),
    };

    payload.queue_id = this.data.payload.id;

    this.mapAdapterValue.cloud_provider.forEach((selectedElement: string) => {
      this.cloud_provider_list.forEach((item: any) => {
        if (selectedElement === item.cloud_provider) {
          payload.data.push({
            id: item.id,
            cloud_provider: item.cloud_provider,
          });
        }
      });
    });

    this.mdDialogRef.close(payload);
  }

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }
}
