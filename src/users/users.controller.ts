import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('api/v1')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('users/create')
  async createUser(@Body() body: any) {
    const { username, password } = body;
    return await this.userService.createUser(username, password);
  }
}
