import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class UserDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id!: string;

  @IsString()
  username!: string;

  @IsString()
  password!: string;

  createdAt!: Date;

  @ApiProperty()
  @IsNumber()
  createdBy!: number;

  updatedAt!: Date;

  @ApiProperty()
  @IsNumber()
  updatedBy!: number;

  @IsDate()
  deletedAt!: Date;

  @ApiProperty()
  @IsNumber()
  deletedBy!: number;
}

