import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {User} from '../auth/entities/user.entity';


@Injectable()
export class UsersService{
    constructor(@InjectRepository(User)
 private userRepo: Repository<User>,){}

 async getAllUsers(){
    return await this.userRepo.find({
        select:['id','email','role','name'],
    });
 }

 async deleteUser(id:number){
    const user = await this.userRepo.findOne({where :{id}});
    if(!user) throw new NotFoundException('User not found');

    await this.userRepo.remove(user);
    return {success:true , message : "User deleted successfully"};
 }
}