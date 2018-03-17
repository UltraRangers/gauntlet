import { Controller, Get } from '@nestjs/common';

@Controller('/users')
export class GetUsersController {

  @Get()
  public execute() {
    return {
      user: 'i am a new user :)'
    };
  }
}
