import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ZodValidationException } from 'src/common/exceptions/zod-validation.exception';
import { ZodSchema } from 'zod';

type ZodDecorator = (schema: ZodSchema) => ParameterDecorator;

const createZodDecorator = (
  source: 'body' | 'params' | 'query',
): ZodDecorator => {
  return (schema: ZodSchema) => {
    return createParamDecorator((_, ctx: ExecutionContext) => {
      const request: Request = ctx.switchToHttp().getRequest();
      const result = schema.safeParse(request[source]);

      if (!result.success) {
        throw new ZodValidationException(result.error);
      }

      return result.data;
    });
  };
};

export const ZBody = createZodDecorator('body');
export const ZParam = createZodDecorator('params');
export const ZQeruy = createZodDecorator('query');
