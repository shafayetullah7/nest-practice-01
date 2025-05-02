import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { Cat } from '../interfaces/cat.interface';
import { CreateCatDto } from '../dto/create.cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  addCat(@Body() payload: CreateCatDto): Cat {
    const newCat = this.catsService.addCat(payload);
    return newCat;
  }

  @Get()
  getCats(): Cat[] {
    return this.catsService.getCats();
  }

  @Get(':id')
  getSingleCat(@Param('id', ParseIntPipe) id: number): Cat {
    console.log(id);
    return this.catsService.getSingleCat(id);
  }
}
