import { Controller,Post,Get,Body, UseGuards } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorator/roles.decorator";

@Controller('feedback')
@UseGuards(JwtAuthGuard,RolesGuard)
export class FeedbackController{
    constructor(private readonly feedbackService:FeedbackService){}

    @Post()
    @Roles('user','admin')
    submit(@Body() body:any){
        return this.feedbackService.create(body);
    }

    @Get()
    @Roles('admin')
    getAll(){
        return this.feedbackService.findAll();
    }
}