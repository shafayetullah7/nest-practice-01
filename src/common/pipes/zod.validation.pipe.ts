// import { PipeTransform, Injectable } from '@nestjs/common';
// import { ZodSchema, ZodError } from 'zod';
// import { ZodValidationException } from '../exceptions/zod-validation.exception';

// @Injectable()
// export class ZodPipe implements PipeTransform {
//   constructor(private readonly schema?: ZodSchema) {}

//   transform(value: unknown): any {
//     if (!this.schema) return value;

//     try {
//       return this.schema.parse(value);
//     } catch (error) {
//       if (error instanceof ZodError) {
//         throw new ZodValidationException(error);
//       }
//       throw error; // Re-throw non-Zod errors
//     }
//   }
// }

// // Factory with explicit typing
// export const ZodValidationPipe = <T extends ZodSchema>(schema: T) => {
//   return new ZodPipe(schema);
// };
// src/common/pipes/zod-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ZodError } from 'zod';
import { ZodValidationException } from '../exceptions/zod-validation.exception';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const dtoClass = metadata.metatype;

    if (!dtoClass) {
      return value;
    }

    // const schema = ZodDtoFactory.getSchema(dtoClass);

    const schema = (dtoClass as any)?.schema;

    if (!schema) {
      return value;
    } // Skip non-Zod DTOs

    try {
      return new dtoClass(value); // Triggers validation
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ZodValidationException(error);
      }
      throw error; // Your ZodDtoFactory already throws formatted errors
    }
  }
}
