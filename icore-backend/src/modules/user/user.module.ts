import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StorageService } from '../storage/storage.service';

@Module({
  controllers: [UserController],
  providers: [UserService, StorageService],
  exports: [UserService],
})
export class UserModule {}
