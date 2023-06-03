import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  users: CreateUserDto[] = [];
  create(user: CreateUserDto) {
    this.users.push();
  }
  //   findAll() {
  //     const sampleUsers = ['tarou', 'jirou'];
  //     // return this.users;
  //     const result = await new UserRepository().getAll();
  //     return sampleUsers;
  //   }

  async getUsers(): Promise<string> {
    const result = await new UserRepository().getAll();
    return JSON.stringify(result);
  }

  async createTable(): Promise<string> {
    const result = await new UserRepository().createTable();
    return 'テーブル作成';
  }
}
