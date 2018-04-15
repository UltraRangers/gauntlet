import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;

  constructor(private readonly userService: UserService, private formBuilder: FormBuilder) {
  }

  public ngOnInit() {
    this.buildLoginForm();
  }

  public buildLoginForm() {
    this.profileForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
