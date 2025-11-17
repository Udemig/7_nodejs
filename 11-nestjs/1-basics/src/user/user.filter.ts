import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  // exception: fırlatılan hata
  // host: istek ve yanıt bilgilerini içeren nesne
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // http formatına çevir
    const response = ctx.getResponse(); // yanıt bilgilerini içeren nesne
    const request = ctx.getRequest(); // istek bilgilerini içeren nesne
    const status = (exception as HttpException).getStatus(); // hata status code'u

    response.status(status).json({
      success: false,
      statusCode: status,
      message: exception.message,
      timeStamp: new Date().toISOString(),
    });
  }
}
