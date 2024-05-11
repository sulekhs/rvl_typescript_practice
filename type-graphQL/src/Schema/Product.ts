import { getModelForClass, prop, pre, ReturnModelType, queryMethod, index, Ref } from "@typegoose/typegoose";
import { IsNumber, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql"
import { User } from "./User";


@index({productId:1})
@ObjectType()
export class Product {
    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop({ required: true, ref: () => User })
    user: Ref<User>;

    @Field(() => String)
    @prop({ required: true })
    name: string

    @Field(() => String)
    @prop({ required: true })
    description: string

    @Field(() => Number)
    @prop({ required: true })
    price: number
}

export const ProductModel = getModelForClass<typeof Product>(Product);

@InputType()
export class CreateProductInput {
    @Field(() => String)
    name: string

    @MinLength(50, {
        message: "Description must be atleast 50 characters"
    })
    @MaxLength(1000, {
        message: "Description must not be more than 1000 characters"
    })
    @Field(() => String)
    description: string

    @IsNumber()
    @Field(() => Number)
    price: number
}

@InputType()
export class GetProductInput {
    @Field(() => String)
    _id: string
}