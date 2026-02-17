import { Controller , Get,Post,Param,Body,Delete, UseGuards } from '@nestjs/common';
import { WalkthroughService } from './walkthrough.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {Roles} from '../auth/decorator/roles.decorator';

@Controller('walkthrough')
@UseGuards(JwtAuthGuard,RolesGuard)
export class WalkthroughController {
    constructor(private readonly walkthroughService:WalkthroughService){}
    
    @Post()
    @Roles('admin')
    create(@Body() body:any){
        return this.walkthroughService.create(body);
    }

    @Get()
    @Roles('admin')
    findAll(){
        return this.walkthroughService.findAll();
    }

    @Delete(':id')
    @Roles('admin')
    remove(@Param('id') id:number){
        return this.walkthroughService.delete(id);
    }
}