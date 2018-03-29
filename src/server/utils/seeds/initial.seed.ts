import { Connection } from 'typeorm';

// Database entities
import { Role } from '../../entities/role.entity';
import { User } from '../../entities/user.entity';

// Database repositories
import { RoleRepository } from '../../repositories/role.repository';
import { UserRepository } from '../../repositories/user.repository';

export class InitialSeed {

  public async seed(connection: Connection): Promise<any> {
    const roleRepository = connection.getCustomRepository(RoleRepository);
    const userRepository = connection.getCustomRepository(UserRepository);

    // create roles
    const roleData: Role[] = [{
      name: 'admin'
    }, {
      name: 'user'
    }];
    await roleRepository.save(roleData);
    const adminRole = await roleRepository.getRoleByName('admin');
    const userRole = await roleRepository.getRoleByName('user');

    // create users
    const password = `$2a$10$1gDRWHaMaHHow8/el2MARubVZKcz9MypV92uA16Zo0bBCyQpZ75.2`; // key: test saltround: 10
    const userData: User[] = [{
      email: 'admin@test.com',
      password: password,
      roles: [adminRole]
    }, {
      email: 'user@test.com',
      password: password,
      roles: [userRole]
    }];
    await userRepository.save(userData);
  }
}
