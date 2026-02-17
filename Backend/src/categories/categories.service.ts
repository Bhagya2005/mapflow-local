
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { Pin } from '../pins/entity/pin.entity'; 

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Pin) private pinRepo: Repository<Pin>,
  ) {}

  async create(dto: { name: string; color: string }, userId: number) {
    const category = this.categoryRepo.create({
      ...dto,
      users: [{ id: userId } as any],
    });
    return await this.categoryRepo.save(category);
  }

  async findAll(user: any) {
    if (user.role === 'admin') {
      return await this.categoryRepo.find({ relations: ['users'] });
    }
    return await this.categoryRepo.find({
      where: { users: { id: user.sub } },
      relations: ['users'],
    });
  }

  async delete(id: number, user: any) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['users', 'pins'], 
    });

    if (!category) throw new NotFoundException('Category nahi mili');

    const isOwner = category.users.some((u) => u.id === user.sub);
    if (user.role !== 'admin' && !isOwner) {
      throw new ForbiddenException('Aap ye delete nahi kar sakte');
    }

    if (category.pins && category.pins.length > 0) {
      await this.pinRepo.remove(category.pins);
    }

    return await this.categoryRepo.remove(category);
  }

  async update(id: number, dto: any, user: any) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!category) throw new NotFoundException('Category nahi mili');

    const isOwner = category.users.some((u) => u.id === user.sub);
    if (user.role !== 'admin' && !isOwner) {
      throw new ForbiddenException('Aap ise update nahi kar sakte');
    }

    Object.assign(category, dto);
    return await this.categoryRepo.save(category);
  }
}
