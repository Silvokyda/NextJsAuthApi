import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
        return this.findOne({ where: { phoneNumber } });
    }

    async createUser(phoneNumber: string, password: string): Promise<User> {
        const user = this.create({ phoneNumber, password });
        return this.save(user);
    }
}