
import { Controller, Post, Get, Delete, Body, Req, UseGuards, Param, Patch, Query } from '@nestjs/common';
import { PinsService } from './pin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('pins')
export class PinsController {
  constructor(private readonly pinsService: PinsService) {}

  @Get('public/:email')
  findPublicPins(@Param('email') email: string) {
    return this.pinsService.findPublicPins(email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('user', 'admin')
  create(@Body() dto: any, @Req() req) {
    return this.pinsService.create(dto, req.user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll(@Req() req) {
    return this.pinsService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    return this.pinsService.remove(+id, req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @Roles('user', 'admin')
  update(@Param('id') id: string, @Body() dto: any, @Req() req) {
    return this.pinsService.update(+id, dto, req.user);
  }
}
