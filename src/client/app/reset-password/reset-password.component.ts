import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService, ApiService } from '../core';
import { DialogService } from '../shared';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
 
  public resetPasswordForm: FormGroup;
  
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.apiService.setAccessToken(params.token);
    });
    this.buildResetPasswordForm();
  }

  public onClickReset() {
    this.resetPassword(this.resetPasswordForm.getRawValue());
  }

  private buildResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  private resetPassword(data: {currentPassword: string, newPassword: string}) {
    return this.userService.resetPassword(data)
      .subscribe(() => {
        this.dialogService.openAlertDialog({
          title: 'Success',
          content: `Password has been reset`
        });
        this.apiService.setAccessToken(null);
        this.router.navigateByUrl('/');
      }, (error: Error) => {
        this.dialogService.openAlertDialog({
          title: 'Error',
          content: `Error occurred, can't reset password.`
        });
      });
  }
}