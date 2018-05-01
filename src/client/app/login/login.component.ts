import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../core';
import { DialogService } from '../shared';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  public ngOnInit() {
    this.buildLoginForm();
  }

  public buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onClickLogin() {
    this.login(this.loginForm.getRawValue());
  }

  private login(data: {email: string, password: string}) {
    this.userService.login(data).subscribe((data) => {
      this.router.navigateByUrl('/cms');
      this.dialogService.openAlertDialog({
        title: 'Success',
        content: 'You are now login'
      });
    }, (error: Error) => {
      this.dialogService.openAlertDialog({
        title: 'Authentication Error',
        content: 'Invalid email or password'
      });
    });
  }
}
