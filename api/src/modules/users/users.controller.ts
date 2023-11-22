import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { EmailAlreadyExist } from './errors/email-already-exists.error';
import { UsersMapper } from './users.mapper';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const emailAlreadyExist = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (emailAlreadyExist) {
      throw new EmailAlreadyExist();
    }

    const created = await this.usersRepository.save({ ...createUserDto });

    return UsersMapper.toHTTP(created);
  }
}
