import { Controller ,Delete,Get,Param, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {Roles} from '../auth/decorator/roles.decorator';
@Controller('users')
@UseGuards(JwtAuthGuard,RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    @Roles('admin')
    findAll(){
        return this.usersService.getAllUsers();
    }

    @Delete(':id')
    @Roles('admin')
        remove(@Param('id') id:number){
            return this.usersService.deleteUser(id);
        }
    }

