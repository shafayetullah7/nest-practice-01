import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';
import { CreateCatDto } from '../dto/create.cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[];
  private totalCats: number;
  constructor() {
    this.cats = [];
    this.totalCats = 0;
  }

  addCat(payload: CreateCatDto): Cat {
    const existingCat = this.cats.find((cat) => cat.name === payload.name);
    if (existingCat) {
      throw new ConflictException('Cat with this name already exists.', {
        cause: new Error(),
        description: 'Some error description',
      });
    }

    const newCat: Cat = { ...payload, id: this.totalCats + 1 };
    this.cats.push(newCat);
    this.totalCats = this.totalCats + 1;
    return newCat;
  }
  getCats(): Cat[] {
    return this.cats;
  }

  getSingleCat(id: number): Cat {
    const cat = this.cats.find((c) => c.id === id);
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return cat;
  }
}
