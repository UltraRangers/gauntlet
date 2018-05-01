import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async createUser(user: User): Promise<User> {
    return this.save(user);
  }

  public async getUserById(id: number): Promise<User> {
    return this.findOneById(id, {
      relations: ['roles']
    });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.findOne({
      relations: ['roles'],
      where: { email }
    });
  }
  
  public async getUsers(options: FindManyOptions<User>): Promise<User[]> {
    return this.find(options);
  }

}
