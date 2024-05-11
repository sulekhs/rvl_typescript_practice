import { injectable } from 'inversify'
import { UserRepository } from '../repository/UserRepository';
import { UserDocument } from '../types/User';
import { QueryOptions, FilterQuery, UpdateQuery, Types } from 'mongoose';

@injectable()
export class UserService {
  constructor(private readonly _usersRepo: UserRepository) {}

  async getAllUsers() {
    try {
        return await this._usersRepo.getAllUsers();
    } catch (err) {
      
    }
  }

  async getParticularUser(id: string) {
    try{
        return await this._usersRepo.getParticularUser(id)
    }catch(err){

    }
  }

  async register(payload: UserDocument) {
    try {
        return await this._usersRepo.register(payload)
    } catch (err) {
      
    }
  }

  async login(payload: any) {
    try {
        return await this._usersRepo.login(payload)
    } catch (err) {
      
    }
  }

  async updateUser(id:Types.ObjectId, update: UpdateQuery<UserDocument>, options: QueryOptions) {
    try{
        return await this._usersRepo.updateUser(id, update, options);
    }catch(err) {

    }
  }

  async deleteUser(id: string) {
    try {
        return await this._usersRepo.deleteUser(id)
    } catch (err) {
      
    }
  }

  async subscribe(id: string, update: UpdateQuery<UserDocument>) {
    try {
      return await this._usersRepo.subscribe(id, update);
    } catch (err) {

    }
  }

  async unsubscribe(id: string, update: UpdateQuery<UserDocument>) {
    try {
      return await this._usersRepo.unsubscribe(id, update);
    } catch (err) {

    }
  }
}