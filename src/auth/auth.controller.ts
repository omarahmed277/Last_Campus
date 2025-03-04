import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LinkedInAuthGuard } from './guards/linkedin-auth.guard';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      // 1️⃣ Format the Google profile data
      console.log(req.user);
      const formattedProfile = {
        id: req.user.id,
        displayName: req.user.displayName,
        emails: req.user.emails,
        provider: 'google',
        _json: req.user._json,
      };

      // 2️⃣ Validate and create/update user with the formatted profile
      const { access_token } = await this.authService.validateOAuthUser(
        formattedProfile,
        'google',
      );

      res.cookie('access_token', access_token);
      return res.redirect('/chats.html'); // Redirect after login
    } catch (error) {
      throw new HttpException(
        error.message || 'Google authentication failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  linkedinLogin() {}

  @Get('linkedin/callback')
  // @UseGuards(LinkedInAuthGuard)
  async linkedinAuthCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    try {
      const clientId = this.configService.get<string>('LINKEDIN_CLIENT_ID');
      const clientSecret = this.configService.get<string>(
        'LINKEDIN_CLIENT_SECRET',
      );
      const redirectUri = this.configService.get<string>(
        'LINKEDIN_CALLBACK_URL',
      );

      // Check if necessary values are defined
      if (!clientId || !clientSecret || !redirectUri) {
        throw new HttpException(
          'Missing LinkedIn configuration',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // 1️⃣ Get Access Token - Fixed URLSearchParams construction
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);
      params.append('redirect_uri', redirectUri);

      // 1️⃣ Get Access Token using axios directly
      const tokenResponse = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        params,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      const accessToken = tokenResponse.data.access_token;

      // 2️⃣ Fetch User Profile
      const profileResponse = await axios.get(
        'https://api.linkedin.com/v2/userinfo',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const profileData = profileResponse.data;

      // 3️⃣ Format the LinkedIn profile data to match the expected structure
      const formattedProfile = {
        id: profileData.sub,
        displayName:
          profileData.name ||
          `${profileData.given_name || ''} ${profileData.family_name || ''}`.trim(),
        emails: [{ value: profileData.email }],
        provider: 'linkedin',
        _json: profileData,
      };

      // 4️⃣ Validate and create/update user with the formatted profile
      const { access_token } = await this.authService.validateOAuthUser(
        formattedProfile,
        'linkedin',
      );

      console.log(access_token);
      res.cookie('access_token', access_token);
      return res.redirect('/chats.html'); // Redirect after login
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message ||
          error.message ||
          'LinkedIn authentication failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req) {
    return req.user;
  }
}
