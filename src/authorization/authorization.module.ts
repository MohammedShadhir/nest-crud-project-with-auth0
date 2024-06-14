import { Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';
// import { AuthorizationGuard } from './authorization.guard';

@Module({
  imports: [UserModule],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthorizationGuard,
  //   },
  // ],
})
export class AuthorizationModule {}
