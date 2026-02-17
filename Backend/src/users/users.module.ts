import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports : [
        TypeOrmModule.forFeature([User]),
        ConfigModule,
        JwtModule
    ],
controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
