import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Role, User } from '../../../common/entities';

import { UserService } from '../core';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {

  public user: User;
  public profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  // interface methods
  public ngOnInit() {
    this.loadProfile();
    this.buildProfileForm();
    this.patchProfileFormValue(this.user);
  }

  // event methods
  public onClickUpdate() {
    const data = this.profileForm.getRawValue();
    this.updateProfile(data);
  }

  private loadProfile() {
    this.userService.currentUser$.subscribe((user: User) => {
      this.user = user;
    });
  }

  private buildProfileForm() {
    this.profileForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  private patchProfileFormValue(user: User) {
    this.profileForm.patchValue({
      email: user.email
    });
  }

  private updateProfile(data: User) {
    this.userService
      .updateProfile(data)
      .subscribe((user: User) => {
        this.user = user;
        this.patchProfileFormValue(this.user);
      }, (error: Error) => {
        console.log(error);
      });
  }
}
