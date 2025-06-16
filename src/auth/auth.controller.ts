import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { RoleEnum } from './enum/role.enum';
import { Roles } from './decorator/roles.decorator';

@ApiTags('Auth')
@Controller('api/v1/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('auth/profile')
  @Roles(RoleEnum.USER, RoleEnum.ADMIN)
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
