import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from 'src/common/interfaces/response.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<ApiResponse<any>> {
    const { name, email, password } = createUserDto;

    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists.');
    }

    // Create the user
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return {
      success: true,
      message: 'User created successfully.',
      data: user,
    };
  }

  async getAllUsers(): Promise<ApiResponse<any>> {
    const users = await this.prisma.user.findMany();

    return {
      success: true,
      message: 'Users retrieved successfully.',
      data: users,
    };
  }

  async getUserById(id: number): Promise<ApiResponse<any>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return {
      success: true,
      message: 'User retrieved successfully.',
      data: user,
    };
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<any>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return {
      success: true,
      message: 'User updated successfully.',
      data: updatedUser,
    };
  }

  async deleteUser(id: number): Promise<ApiResponse<any>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'User deleted successfully.',
      data: null,
    };
  }
}
