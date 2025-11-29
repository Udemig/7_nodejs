import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from '@prisma/client';

// Custom Decorator
const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  // yapılan api isteğine erişmek için request objesine erişebiliriz
  const request = ctx.switchToHttp().getRequest();

  // user nesnesinin tipini belirle
  const user = request.user as User;

  // gelen parametreye göre user nesnesini döndür
  if (data) {
    return user[data as keyof User];
  }

  // user nesnesini döndür
  return user;
});

export default User;

// Örnek Kullanım
// @User()     >  data : undefined   >     {id:123,email:"test@test.com"}
// @User("id") > data: id            >     123
