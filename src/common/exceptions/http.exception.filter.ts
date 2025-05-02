import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    response.status(exception.getStatus()).send({
      success: false,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
