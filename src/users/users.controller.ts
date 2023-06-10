import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.getUsers();
    //return 'hello world';
  }

  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @Get('/table')
  createTable() {
    return this.usersService.createTable();
  }
}
