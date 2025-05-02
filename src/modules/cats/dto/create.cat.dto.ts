import { ZodDtoFactory } from 'src/common/factories/zod/zod.dto.factory';
import { z } from 'zod';

const createCatBodySchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is too short')
      .max(200, 'Name cannot be more than 200 characters.')
      .transform((data) => `${data} x`),
    age: z.number().min(0, 'Age cannot be negative').max(50, 'Max age is 50'),
    breed: z.string().min(1, 'Invalid breed').max(50, 'Invalid breed'),
  })
  .strict();
export class CreateCatDto extends ZodDtoFactory.create(createCatBodySchema) {}
export type TCreateCatBodyDto = InstanceType<typeof CreateCatDto>;
// export type TCreateCatBodyDto = z.infer<typeof createCatBodySchema>;
