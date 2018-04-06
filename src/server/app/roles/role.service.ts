import { Component } from '@nestjs/common';

@Component()
export class RoleService {
  constructor() {}

  public healthCheck() {
    return 'ok';
  }
}
