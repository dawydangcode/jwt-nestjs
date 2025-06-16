import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { IsNull, Repository } from 'typeorm';
import { UserModel } from './model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUser(username: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: { username: username, deletedAt: IsNull() },
    });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    return user.toModel();
  }

  async createUser(username: string, password: string): Promise<UserModel> {
    const existingUser = await this.userRepository.findOne({
      where: { username: username, deletedAt: IsNull() },
    });
    if (existingUser) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Băm mật khẩu
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const entity = new UserEntity();
    entity.username = username;
    entity.password = hashedPassword;
    entity.createdAt = new Date();

    const newUser = await this.userRepository.save(entity);
    return await this.getUser(newUser.username);
  }
}
