import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entity/feedback.entity';
import { Repository } from 'typeorm';
@Injectable()
export class FeedbackService {
    constructor(@InjectRepository(Feedback) private feedbackRepo:Repository<Feedback>){}
   
    async create(data:any){
        const feedback = this.feedbackRepo.create(data);
        return await this.feedbackRepo.save(feedback);
    }

    async findAll(){
        return await this.feedbackRepo.find();
    }
}

