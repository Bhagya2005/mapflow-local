
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
 import { getOtpTemplate } from './templates/otp.template'; 
 import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private otpStore = new Map<string, { otp: string, expires: number }>();

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}


  async register(dto: RegisterDto) {
    const userExists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (userExists) throw new BadRequestException('User already exists');
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashedPassword });
    return await this.userRepo.save(user);
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userRepo.findOne({ where: { email }, select: ['id', 'name', 'email', 'password', 'role'] });
    if (!user || !(await bcrypt.compare(pass, user.password))) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, { secret: this.configService.get('JWT_ACCESS_SECRET'), expiresIn: '1h' }),
      refresh_token: this.jwtService.sign(payload, { secret: this.configService.get('JWT_REFRESH_SECRET'), expiresIn: '7d' }),
    };
  }

async forgotPassword(email: string) {
  const user = await this.userRepo.findOne({ where: { email } });
  if (!user) throw new BadRequestException('User not found');

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  this.otpStore.set(email, { otp, expires: Date.now() + 300000 }); 

  await this.mailerService.sendMail({
    to: email,
    subject: `${otp} - MapFlow Verification Code`,
    html: getOtpTemplate(user.name || 'User', otp),
  });

  return { message: 'OTP Sent' };
}

  async verifyOTP(email: string, otp: string) {
    const data = this.otpStore.get(email);
    if (!data || data.otp !== otp || Date.now() > data.expires) throw new BadRequestException('Invalid OTP');
    return { success: true };
  }

  async resetPassword(dto: any) {
    const { email, otp, password } = dto;
    await this.verifyOTP(email, otp);
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepo.update({ email }, { password: hashedPassword });
    this.otpStore.delete(email);
    return { message: 'Password Updated' };
  }
}

