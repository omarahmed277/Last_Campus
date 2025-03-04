import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LinkedInAuthGuard extends AuthGuard('linkedin') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Attempt to authenticate with LinkedIn
      const result = await super.canActivate(context);
      return result as boolean;
    } catch (error) {
      console.error('LinkedIn auth guard error:', error);
      // You can rethrow the error or handle it differently
      throw error;
    }
  }
}
