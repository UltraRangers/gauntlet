import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../core';
import { DialogService } from '../shared';

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  
  constructor(
    public userService: UserService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit() {
    this.buildForgotPasswordForm();
  }

  public buildForgotPasswordForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  public onClickSend() {
    this.sendResetPasswordEmail(this.forgotPasswordForm.getRawValue());
  }

  public sendResetPasswordEmail(data: {email: string}) {
    this.userService.sendResetPasswordEmail(data)
      .subscribe(() => {
        this.dialogService.openAlertDialog({
          title: 'Success',
          content: 'Email sent please check you inbox'
        })
      }, (error: Error) => {
        this.dialogService.openAlertDialog({
          title: 'Error',
          content: 'There is an error on processing your request'
        });
      });
  }
}
