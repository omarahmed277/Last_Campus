import { ExperienceLevel, Gender } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required.' })
  @MinLength(2, { message: 'Name must be at least 2 characters long.' })
  @MaxLength(50, { message: 'Name must be at most 50 characters long.' })
  @Matches(/^[A-Za-z\s]+$/, { message: 'Please enter a valid name.' })
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required.' })
  @Matches(/^01[0125][0-9]{8}$/, {
    message:
      'Please enter a valid Egyptian phone number starting with 010, 011, 012, or 015.',
  })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Gender is required.' })
  @IsIn(['MALE', 'FEMALE'], {
    message: 'Gender must be either Male or Female.',
  })
  gender: Gender;

  @IsString()
  @IsNotEmpty({ message: 'Country is required.' })
  country: string;

  @IsString()
  @IsNotEmpty({ message: 'Specialization is required.' })
  specialization: string;

  @IsString()
  @IsNotEmpty({ message: 'Experience level is required.' })
  @IsIn(['BEGINNER', 'INTERMEDIATE', 'EXPERT'], {
    message: 'Please select a valid experience level.',
  })
  experienceLevel: ExperienceLevel;

  @IsString()
  @IsOptional()
  bio?: string;
}
