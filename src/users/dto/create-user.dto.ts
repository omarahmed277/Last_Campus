import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ExperienceLevel, Specialization } from '@prisma/client';

export enum SpecializationEnum {
  DESIGN = 'التصميم',
  PROGRAMMING = 'البرمجة',
  DATA_ANALYSIS = 'تحليل البيانات',
  CONTENT_CREATION = 'إنشاء المحتوى',
  MARKETING = 'التسويق',
  PRODUCT_MANAGEMENT = 'إدارة المنتجات',
  CAREER_COUNSELING = 'الإرشاد الوظيفي',
  BUSINESS_DEVELOPMENT = 'تطوير الأعمال',
  SOFT_SKILLS = 'المهارات الشخصية',
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[A-Za-z\s]+$/, { message: 'Please enter a valid name.' })
  name: string;

  @IsEmail({}, { message: 'Please enter a valid email address.' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?\d{8,15}$/, { message: 'Please enter a valid phone number.' })
  phone: string;

  @IsEnum(['Male', 'Female'])
  @IsNotEmpty()
  gender: 'Male' | 'Female';

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsEnum(SpecializationEnum, { each: true })
  @IsNotEmpty()
  specialization: Specialization[];

  @IsEnum(ExperienceLevel)
  @IsNotEmpty()
  experienceLevel: ExperienceLevel;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsString()
  @MinLength(6)
  password: string;
}
