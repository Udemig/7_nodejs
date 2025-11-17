import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    console.log('UserMiddleware çalıştı!', req.method, req.url);

    next();
  }
}
