import { Module } from '@nestjs/common';

import { RoleService } from './role.service';

@Module({
  imports: [],
  exports: [],
  components: [
    RoleService
  ]
})
export class AppModule {}
