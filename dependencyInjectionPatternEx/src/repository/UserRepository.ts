import { injectable } from 'inversify';
import { DBService } from '../service/DBService';
import { UserDocument } from '../types/User';
import { QueryOptions, UpdateQuery, Types } from "mongoose";

@injectable()
export class UserRepository {
  constructor(private readonly _dbContext: DBService) {}

  async getAllUsers() {
    try {
        return await this._dbContext.users.find({})
    } catch (err) {
      
    }
  }

  async getParticularUser(id: string) {
    try {
        return  await this._dbContext.users.findById(id)
    } catch (err) {
      
    }
  }

  async register({ username, email, password,subscribedUsers, subscribers, isAdmin, img  }: UserDocument) {
    try {
        return await this._dbContext.users.create({ username, email, password,subscribedUsers, subscribers, isAdmin, img });
    } catch (err) {
      
    }
  }

  async login({ username }: UserDocument) {
    try {
        return await this._dbContext.users.findOne({ username });
    } catch (err) {
      
    }
  }

  async updateUser(id: Types.ObjectId, update: UpdateQuery<UserDocument>, options: QueryOptions) {
    try {
        return await this._dbContext.users.findByIdAndUpdate(id, update, options);
    } catch (err) {
      
    }
  }

  async deleteUser(id: string) {
    try {
        return await this._dbContext.users.deleteOne({ _id: id })
    } catch (err) {
      
    }
  }

  async subscribe(id: string, update: UpdateQuery<UserDocument>) {
    try {
      return this._dbContext.users.findByIdAndUpdate(id, update);
    } catch (err) {
      
    }
  }

  async unsubscribe(id: string, update: UpdateQuery<UserDocument>) {
    try {
      return this._dbContext.users.findByIdAndUpdate(id, update);
    } catch (err) {
      
    }
  }
}