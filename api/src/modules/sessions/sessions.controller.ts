import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { CreateSessionDto } from './dtos/create-sesssion.dto';
import { EmailOrPasswordIncorrectError } from './errors/email-or-password-incorrect.error';
import { JwtService } from '@nestjs/jwt';

import { UsersMapper } from '../users/mappers/users.mapper';
import { UsersRepository } from '../users/repositories/abstract/users.repository';

@Controller('/sessions')
export class SessionsController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() createSessionDto: CreateSessionDto) {
    const user = await this.usersRepository.findByEmail(createSessionDto.email);

    if (!user) {
      throw new EmailOrPasswordIncorrectError();
    }

    const passwordMatch = user.props.password === createSessionDto.password;

    if (!passwordMatch) {
      throw new EmailOrPasswordIncorrectError();
    }

    const payload = { sub: user.props.id };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: UsersMapper.toHTTP(user),
      accessToken,
    };
  }
}
