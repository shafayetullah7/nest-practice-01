import { HttpException, HttpStatus } from '@nestjs/common';
import { ZodError } from 'zod';

export class ZodValidationException extends HttpException {
  constructor(error: ZodError) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation Error',
        errors: error.errors.map((err) => ({
          path: err.path.join('.'),
          code: err.code,
          message: err.message,
        })),
        timestamp: new Date().toISOString(),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
