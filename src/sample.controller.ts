import { Controller, Get, HttpCode } from '@nestjs/common';
import { CatsService } from './modules/cats/services/cats.service';

@Controller('sample')
export class SampleController {
  constructor(private readonly catsService: CatsService) {}

  @HttpCode(200)
  @Get()
  getSample() {
    return this.catsService.getCats();
  }
}
