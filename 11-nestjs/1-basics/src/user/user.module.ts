import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  // Bütün user endpoint'lerinde UserMiddleware'i çalıştırır
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(UserMiddleware).forRoutes({
  //     path: '/user*',
  //     method: RequestMethod.POST,
  //   });
  // }
}
