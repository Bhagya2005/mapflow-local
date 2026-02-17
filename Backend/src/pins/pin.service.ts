
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pin } from './entity/pin.entity';

@Injectable()
export class PinsService {
  constructor(@InjectRepository(Pin) private pinRepo: Repository<Pin>) {}

  async create(dto: { name: string; description: string; categoryId: number; lat: number; lng: number }, userId: number) {
    const pin = this.pinRepo.create({
      name: dto.name,
      description: dto.description,
      lat: dto.lat,
      lng: dto.lng,
      categories: [{ id: dto.categoryId } as any], 
      users: [{ id: userId } as any],
    });
    return await this.pinRepo.save(pin);
  }

  async findAll(user: any) {
    if (user.role === 'admin') {
      return await this.pinRepo.find({ relations: ['categories', 'users'] });
    }

    return await this.pinRepo.find({
      where: { users: { id: user.sub } },
      relations: ['categories'],
    });
  }

  async update(id: number, dto: any, user: any) {
    const pin = await this.pinRepo.findOne({
      where: { id },
      relations: ['users', 'categories'],
    });

    if (!pin) throw new NotFoundException('Pin nahi mila');

    const isOwner = pin.users.some((u) => u.id === user.sub);
    if (user.role !== 'admin' && !isOwner) {
      throw new ForbiddenException('Aap ise update nahi kar sakte');
    }

  
    if (dto.categoryId) {
      pin.categories = [{ id: dto.categoryId } as any];
    }

    const { categoryId, ...rest } = dto;
    Object.assign(pin, rest);
    return await this.pinRepo.save(pin);
  }

  async remove(id: number, user: any) {
    const pin = await this.pinRepo.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!pin) throw new NotFoundException('Pin nahi mila');

    const isOwner = pin.users.some((u) => u.id === user.sub);
    if (user.role !== 'admin' && !isOwner) {
      throw new ForbiddenException('Aap ise delete nahi kar sakte');
    }

    return await this.pinRepo.remove(pin);
  }



async findPublicPins(email: string) {
  const pins = await this.pinRepo.find({
    where: { 
      users: { email: email } 
    },
    relations: ['categories'], 
  });

  if (!pins) throw new NotFoundException('No nodes found for this operator');

  return {
    success: true,
    data: pins
  };
}
}