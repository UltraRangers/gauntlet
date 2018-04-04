import { Module } from '@nestjs/common';

import { RoleProvider } from './role.provider';
import { RoleService } from './role.service';

@Module({
  imports: [],
  exports: [
    RoleProvider
  ],
  components: [
    RoleService
  ]
})
export class AppModule {}
