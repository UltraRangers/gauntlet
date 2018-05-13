import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { FindManyOptions } from 'typeorm';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { User } from '../../../../common/entities';
import { ApiService } from './api.service';

@Injectable()
export class UserService {

  public currentUser$: Observable<User>;

  private currentUserSource: ReplaySubject<User>;

  public constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.currentUserSource = new ReplaySubject<User>(1);
    this.currentUser$ = this.currentUserSource.asObservable();
  }
  public login(data: {
    email: string,
    password: string
  }): Observable<{ user: User, token: string }> {
    return this.apiService.post('/users/login', data)
      .do((data: {
        user: User,
        token: string
      }) => {
        this.currentUserSource.next(data.user);
        this.apiService.setAccessToken(data.token);
      }, (error: Error) => {
        this.currentUserSource.next(null);
        this.apiService.setAccessToken(null);
      });
  }

  public logout() {
    this.currentUserSource.next(null);
    this.apiService.setAccessToken(null);
    this.router.navigateByUrl('/home');
  }

  public getMe(): Observable<User> {
    return this.apiService.get(`/users/me`)
      .do((user: User) => {
        console.log('current user', user);
        this.currentUserSource.next(user);
      }, (error: Error) => {
        this.currentUserSource.next(null);
        this.apiService.setAccessToken(null);
      });
  }

  public getUsers(options: FindManyOptions<User>): Observable<User[]> {
    return this.apiService.get(`/users`, { options });
  }

  public sendResetPasswordEmail(data: {email: string}): Observable<void> {
    return this.apiService.post(`/users/reset-password`, data);
  }

  public resetPassword(data: {currentPassword: string, newPassword: string}): Observable<void> {
    return this.apiService.put(`/users/reset-password`, data);
  }
}
