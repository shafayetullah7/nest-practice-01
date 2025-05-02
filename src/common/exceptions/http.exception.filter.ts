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

    const status = exception.getStatus() || 500;
    const message = exception.message || 'Internal server error';
    const description: string[] = [];

    const errorResponse = exception.getResponse();
    if (typeof errorResponse === 'object') {
      const errorDescription = (errorResponse as any).description;
      if (errorDescription && typeof errorDescription === 'string') {
        description.push(errorDescription);
      } else if (Array.isArray(errorDescription)) {
        errorDescription.forEach((des) => {
          if (typeof des === 'string') description.push(des);
        });
      }
    }

    response.status(status).send({
      success: false,
      status,
      message,
      description,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
