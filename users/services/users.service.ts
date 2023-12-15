import UsersDao from '../dao/users.dao';

import { CRUD } from '../../common/interfaces/crud.interface';

import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';

class UsersService implements CRUD {
  async create(resource: CreateUserDto) {
    return UsersDao.addUser(resource);
  }

  async list(limit: number, page: number) {
    return UsersDao.getUsers(limit, page);
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }

  async getUserByEmailWithPassword(email: string) {
    return UsersDao.getUserByEmailWithPassword(email);
  }

  async readById(id: string) {
    return UsersDao.getUserById(id);
  }

  async patchById(id: string, resource: PatchUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  async putById(id: string, resource: PutUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  async deleteById(id: string): Promise<any> {
    return UsersDao.removeUserById(id);
  }
}

export default new UsersService();