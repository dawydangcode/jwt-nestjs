import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { IsNull, Repository } from 'typeorm';
import { UserModel } from './model/user.model';

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
}
