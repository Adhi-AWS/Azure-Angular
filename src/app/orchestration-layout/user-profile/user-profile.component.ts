/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-object-injection */
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { AdminService } from 'src/app/services/admin.service';

import { ErrorManagementService } from 'src/app/services/error-management.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { User } from './model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileMenu:any=[
    {
      'name':'Update Profile',
      'link':'profile'
    },
    {
      'name':'Reset Password',
      'link':'resetPassword'
    }
  ]
  selectedIndex:any = 0;
  userName: string='';
  userId: string='';
  userForm: FormGroup;
  passwordResetForm:FormGroup;
  profileMode:boolean=true;
  passordResetMode:boolean=false;
  ispassMatch = true;
  isChamplogin: boolean = false;
  
  constructor(
    private adminservice:AdminService,
    private dialog: MatDialog,
    private errorManagementService:ErrorManagementService ,
    private userService:UserService,public fb: FormBuilder) {

    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email:['',[Validators.required,Validators.email]],
      user_name:  ['', [Validators.required]],
      id: [''],
      modified_by: ['']
    });
    this.passwordResetForm = this.fb.group({
      password: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      id: [''],
      modified_by: ['']
    });
  }

  ngOnInit(): void {
    this.userName = this.adminservice.getDisplayname();
    this.userId = this.adminservice.getUsername();
    this.userService.getUserDetail(this.userId).subscribe((userData:any)=>{
      this.initalizeUserForm(userData.data);
    },
    (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.initalizeUserForm(this.userForm.value);
      }
    })
     let is_champ_login = sessionStorage.getItem('isChampLogin');
    this.isChamplogin = is_champ_login == 'true' ? true: false;
  }
  initalizeUserForm(data:User) {
    this.userForm = this.fb.group({
      first_name: [data.first_name ? data.first_name : '', [Validators.required]],
      last_name: [data.last_name ? data.last_name : '', [Validators.required]],
      email:[data.email_address ? data.email_address : this.userId, [Validators.required,Validators.email]],
      user_name:  [data.user_name ? data.user_name : '', [Validators.required]],
      id: [data.id],
      modified_by: [data.modified_by]
    });
    this.passwordResetForm = this.fb.group({
      password: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      id: [data.id],
      modified_by: [data.modified_by]
    });
  }
  selectMenu(item:any, i:any):void{
    this.selectedIndex = i;
    if(item.link == 'profile')
    {
      this.profileMode=true;
      this.passordResetMode=false;
    }
    if(item.link == 'resetPassword')
    {
      this.profileMode=false;
      this.passordResetMode=true;
    }
  }
  public errorHandling = (control: string, error: string) => {
    if(this.profileMode){
    return this.userForm.controls[control].hasError(error);
    }
    if(this.passordResetMode){
      return this.passwordResetForm.controls[control].hasError(error);
    }
    return true
  }
  submitForm() {
    if(!this.userForm.invalid)
    this.userService.updateUserDetail(this.userForm.value).subscribe((response: any) => {
      if (response) {
        this.userName = response.first_name+' '+response.last_name;
        const dialogRef: any = this.dialog.open(ConfirmationComponent, {
          width: '350px',
          height: '350px',
          disableClose: true,
          data: {
            confirmationMsg:
              'Data updated successfully',
          },
        });
        dialogRef.afterClosed().subscribe((value: any) => {

        });
      }
    },
    (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.errorManagementService.handleApiError(
          'Deploy Transaction',
          error
        );
      }
    }
  );
  }
  // {"password":this.passwordResetForm.value.password1}
  submitResetForm(){
    if(!this.passwordResetForm.invalid && this.passwordMatch())        
    this.userService.changePassword(this.passwordResetForm.value).subscribe((response: any) => {
      if (response) {
        const dialogRef: any = this.dialog.open(ConfirmationComponent, {
          width: '350px',
          height: '350px',
          disableClose: true,
          data: {
            confirmationMsg:
              'Password updated successfully',
          },
        });
        dialogRef.afterClosed().subscribe((value: any) => {
        });
      }
    },
    (error: any) => {
      if (error instanceof HttpErrorResponse) {
        this.errorManagementService.handleApiError(
          'Deploy Transaction',
          error
        );
      }
    }
  );
  }

  passwordMatch():boolean {
    if(this.passwordResetForm.value.password === this.passwordResetForm.value.password1 ){
       this.ispassMatch = true; 
      return true;
    }
    else{
      this.ispassMatch = false;
      return false;       
    }
    
  }
}

