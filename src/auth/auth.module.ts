import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/users/entity/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    AuthService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
