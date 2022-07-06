import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AppService } from 'src/app/services/app.service';
import { ManageUserService } from 'src/app/services/manage-user-service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  addUpdateForm: FormGroup = new FormGroup({
    username: new FormControl(
      this.data.role_title === 'Update' ? this.data.payload.username : '',
      Validators.required
    ),
    role_id: new FormControl(
      this.data.role_title === 'Update' ? this.data.payload.role_id : '',
      Validators.required
    ),
    // product_role_id: new FormControl(
    //   this.data.role_title === 'Update' ? this.data.payload.product_role_id : ''
    // ),
  });


  isValid: boolean = false;
  roleList: any=[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private mdDialogRef: MatDialogRef<AddRoleComponent>,
    private adminService: AdminService,
    private manageUserService: ManageUserService,
    private appService:AppService
  ) {}

  ngOnInit(): void {
    this.manageUserService.getRole().subscribe((response: any) => {
    response.data.forEach((element:any) => {
          this.roleList.push(element);
        });
  });

    this.addUpdateForm.valueChanges.subscribe(() => {
      if (this.data.role_title === 'Add' && this.addUpdateForm.valid) {
        this.isValid = true;
      } else if (
        this.data.role_title === 'Update' &&
        this.addUpdateForm.valid &&
        (this.data.payload.username !== this.auroleValue.username ||
          this.data.payload.role !== this.auroleValue.role )
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }

  get auroleValue(): any {
    return this.addUpdateForm.value;
  }


  addUpdateRole(): void {
    const payload: any = { ...this.auroleValue };
    if (this.data.role_title === 'Update') {
      payload.id = this.data.payload.id;
      payload.modified_by = this.adminService.getUsername();
    } else {
      payload.created_by = this.adminService.getUsername();
    }
    this.mdDialogRef.close(payload);
  }

  onReset(): void {
    this.addUpdateForm.reset();
  }

  close(value: any = false): void {
    this.mdDialogRef.close(value);
  }

  @HostListener('keydown.esc')
  onEsc(): void {
    this.close(false);
  }


}
