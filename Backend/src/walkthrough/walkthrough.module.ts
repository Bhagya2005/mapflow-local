import { Module } from '@nestjs/common';
import { WalkthroughController } from './walkthrough.controller';
import { WalkthroughService } from './walkthrough.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Walkthrough } from './entity/walkthrough.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [
        TypeOrmModule.forFeature([Walkthrough]),
        ConfigModule,
        JwtModule
    ],
    controllers: [WalkthroughController],
  providers: [WalkthroughService],
})
export class WalkthroughModule {}
