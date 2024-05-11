import { Request, Response } from 'express';
//import User from '../models/User';
import { UserDocument } from './User';

interface Context {
    req:Request;
    res:Response;
    user: UserDocument | null;
}

export default Context;