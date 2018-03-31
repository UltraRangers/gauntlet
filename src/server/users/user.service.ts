import { Component } from '@nestjs/common';

@Component()
export class UserService {
  constructor() {}

  public healthCheck() {
    return 'ok';
  }
}
