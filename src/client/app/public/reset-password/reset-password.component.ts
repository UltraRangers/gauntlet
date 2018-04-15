import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public resetPasswordForm: FormGroup;
  public hasSentEmail: boolean = false;

  constructor(private readonly userService: UserService, private formBuilder: FormBuilder) {
    userService.getMe().subscribe(
      (user) => {
        if (user && Object.keys(user).length) {
          this.isLoggedIn = true; // mock
        }
      }
    );
  }

  public ngOnInit() {
    this.buildResetPasswordForm();
  }

  public buildResetPasswordForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  public onResetPassword() {
    this.hasSentEmail = true;
  }
}
