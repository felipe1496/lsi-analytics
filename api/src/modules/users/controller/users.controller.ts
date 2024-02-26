import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import { CreateUserDto } from '../dtos/create-user.dto';
import { EmailAlreadyExistError } from '../errors/email-already-exists.error';

import { Request } from 'express';
import { UserNotFoundError } from '../errors/user-nor-found.error';
import { UsersMapper } from '../mappers/users.mapper';
import { UsersRepository } from '../repositories/abstract/users.repository';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createUserDto: CreateUserDto) {
    const emailAlreadyExist = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (emailAlreadyExist) {
      throw new EmailAlreadyExistError();
    }

    const created = await this.usersRepository.save({ ...createUserDto });

    return UsersMapper.toHTTP(created);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findByToken(@Req() req: Request) {
    const userId = req.userId;

    const user = await this.usersRepository.findByToken({ userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    return UsersMapper.toHTTP(user);
  }
}
