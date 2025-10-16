import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body('walletAddress') walletAddress: string): Promise<User> {
    return this.userService.create(walletAddress);
  }

  @Get(':walletAddress')
  async findOne(@Param('walletAddress') walletAddress: string): Promise<User | null> {
    return this.userService.findOneByWalletAddress(walletAddress);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: Partial<User>): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}