import { Controller, Post, Get, Delete, Body, Req, UseGuards, Param ,Patch} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles('user', 'admin')
  create(@Body() dto: any, @Req() req) {
    return this.categoriesService.create(dto, req.user.sub);
  }

  @Get()
  @Roles('user', 'admin')
  findAll(@Req() req) {
    return this.categoriesService.findAll(req.user);
  }

  @Delete(':id')
  @Roles('user', 'admin')
  remove(@Param('id') id: string, @Req() req) {
    return this.categoriesService.delete(+id, req.user);
  }

  @Patch(':id')
@Roles('user', 'admin')
update(@Param('id') id: string, @Body() dto: any, @Req() req) {
  return this.categoriesService.update(+id, dto, req.user);
}
}