import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; 
import { JwtModule } from '@nestjs/jwt';       
import { PinsController } from './pin.controller';
import { PinsService } from './pin.service';
import { Pin } from './entity/pin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pin]),
    ConfigModule, 
    JwtModule,    
  ],
  controllers: [PinsController],
  providers: [PinsService],
})
export class PinsModule {}