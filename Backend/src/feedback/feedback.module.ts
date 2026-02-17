import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entity/feedback.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        TypeOrmModule.forFeature([Feedback]),
        JwtModule,
        ConfigModule
    ],
    controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
