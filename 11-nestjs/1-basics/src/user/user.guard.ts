import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // yapılan isteğin header bilgilerini al
    const req = context.switchToHttp().getRequest() as Request;

    // authorization header'ını al
    const authToken = req.headers.authorization;

    // auth header'ı ile gelen token geçerli mi?
    const isValid = authToken === '1234567';

    if (!isValid)
      throw new HttpException('Tokenin Yanlış', HttpStatus.UNAUTHORIZED);

    // fonkisyonun döndürdüğü değer isteğin devam edip edemeyeceğini belirler.
    return isValid;
  }
}
