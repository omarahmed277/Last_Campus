import { OmitType } from '@nestjs/mapped-types';
import { RegisterDto } from './register.dto';

export class CompleteRegistrationDto extends OmitType(RegisterDto, [
  'password',
]) {}
