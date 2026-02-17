import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Walkthrough } from "./entity/walkthrough.entity";


@Injectable()
export class WalkthroughService{
    constructor(
        @InjectRepository(Walkthrough)
        private readonly walkthroughRepo : Repository<Walkthrough>,
    ){}

    create(data:Partial<Walkthrough>){
        const walkthrough = this.walkthroughRepo.create(data);
        return this.walkthroughRepo.save(walkthrough);
    }

    findAll(){
        return this.walkthroughRepo.find();
    }

    async delete(id:number){
        const result = await this.walkthroughRepo.delete(id);
        if (result.affected === 0) throw  new NotFoundException('walkthrough not found');
        return {success : true} 
    }

    
}