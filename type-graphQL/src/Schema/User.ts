import { getModelForClass, prop, pre, ReturnModelType, queryMethod, index } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import bcrypt from 'bcrypt';
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
//import config from 'config';

//const saltWorkFactor = config.get<number>("saltWorkFactor");

function findByEmail(this: ReturnModelType<typeof User, QueryHelpers>, email: User['email']){
    return this.findOne({email});
}

interface QueryHelpers{
    findByEmail: AsQueryMethod<typeof findByEmail>
}

@pre<User>('save',async function () {
    if(!this.isModified('password')) {
        return 
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hashSync(this.password, salt);

    this.password = hash;
})

@index({email:1})
@queryMethod(findByEmail)
@ObjectType()
export class User {
    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop({ required: true })
    username: string

    @Field(() => String)
    @prop({ required: true })
    email: string

    @Field(() => String)
    @prop({ required: true })
    password: string
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User)

@InputType()
export class CreateUserInput {
    @Field(() => String)
    username: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @MinLength(6, {
        message: 'password must be atleast 6 characters long'
    })
    @MaxLength(15, {
        message: 'password must not be more than 15 characters long'
    })
    @Field(() => String)
    password: string;
}


@InputType()
export class LoginInput {
    @IsEmail()
    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;
}
