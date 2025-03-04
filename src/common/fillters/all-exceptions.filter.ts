import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from 'src/common/interfaces/response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    let errors: any = null;

    // Handle NestJS HTTP Exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();

      if (typeof responseBody === 'object' && responseBody !== null) {
        message = (responseBody as any).message || message;
        errors = (responseBody as any).errors || null;
      } else {
        message = responseBody as string;
      }
    }

    // Handle Validation Errors (class-validator)
    else if (
      exception?.response?.message &&
      Array.isArray(exception.response.message)
    ) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation failed';
      errors = exception.response.message.map((error) => ({
        field: error.property,
        errors: Object.values(error.constraints || {}),
      }));
    }

    // Handle Prisma Errors (e.g., unique constraint violation)
    else if (exception?.code === 'P2002') {
      status = HttpStatus.CONFLICT;
      message = 'Duplicate entry. The provided data already exists.';
      errors = [
        {
          field: exception.meta?.target?.[0] || 'unknown',
          message: 'This value must be unique.',
        },
      ];
    }

    // Handle Any Other Unexpected Errors
    const errorResponse: ApiResponse<null> = {
      success: false,
      message,
      data: null,
      error: errors || exception.message || 'Internal server error',
    };

    response.status(status).json(errorResponse);
  }
}
