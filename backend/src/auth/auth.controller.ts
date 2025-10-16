import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('walletAddress') walletAddress: string) {
    // In a real implementation, we would verify the wallet signature here
    const user = await this.authService.validateUser(walletAddress);
    const token = await this.authService.login(walletAddress);
    
    return {
      user,
      ...token,
    };
  }
}