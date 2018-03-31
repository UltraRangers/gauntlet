import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

  public async getRoles(options?: FindManyOptions<Role>): Promise<Role[]> {
    if (!options) {
      options = {};
    }
    return this.find(options);
  }

  public getRoleByName(name: string): Promise<Role> {
    return this.findOne({ where: { name } });
  }
}
