import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(phoneNumber: string, password: string): Promise<User> {
    const user = this.usersRepository.create({ phoneNumber, password });
    return this.usersRepository.save(user);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { phoneNumber } });
  }
}