import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  components: []
})
export class AppModule {}
