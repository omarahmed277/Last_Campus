import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password ?? ''))) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return this.generateToken(user);
  }

  async register(data: RegisterDto) {
    // Check if email exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    // Generate JWT
    return this.generateToken(user);
  }

  async validateOAuthUser(profile: any, provider: 'google' | 'linkedin') {
    let user = await this.prisma.user.findUnique({
      where: { email: profile.emails[0].value },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: provider === 'google' ? profile.id : null,
          linkedinId: provider === 'linkedin' ? profile.id : null,
        },
      });
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
    };
  }
}
