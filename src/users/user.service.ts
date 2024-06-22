import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(phoneNumber: string, password: string): Promise<User> {
    // Check if the phoneNumber already exists
    const existingUser = await this.usersRepository.findOne({ where: { phoneNumber } });
    if (existingUser) {
      throw new ConflictException('Phone number already registered');
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.phoneNumber = phoneNumber;
    user.password = hashedPassword;
    return this.usersRepository.save(user);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { phoneNumber } });
  }
}
