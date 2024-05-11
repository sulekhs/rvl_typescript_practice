import { ApolloError } from "apollo-server";
import { CreateUserInput, LoginInput, UserModel } from "../Schema/User";
import bcrypt from 'bcrypt';
import { signJwt } from "../utils/jwt";
import Context from './../types/context';


export default class UserService {
    async createUser(input: CreateUserInput) {
        return UserModel.create(input);
    }

    async login(input: LoginInput, context: Context) {
        let e = 'Invalid email or password';
        const user = await UserModel.find().findByEmail(input.email).lean();

        if(!user) {
            throw new ApolloError(e);
        }

        const passwordIsValid = await bcrypt.compare(input.password, user.password);
        if(!passwordIsValid) {
            throw new ApolloError(e);
        }

        const token = signJwt(user);
        
        context.res.cookie('accessToken', token, {//token here is our payload
            maxAge:3.154e10, //1year
            httpOnly:true,
            domain: 'localhost',
            sameSite:'strict',
            secure: process.env.NODE_ENV === 'production'
        });

        return token;

    }
}