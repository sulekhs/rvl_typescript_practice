import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateProductInput, GetProductInput, Product } from "../Schema/Product";
import ProductService from "../service/ProductService";
import Context from './../types/context';


@Resolver()
export default class ProductResolver {
    constructor(private productService: ProductService) {
        this.productService = new ProductService();
    }

    @Authorized()
    @Mutation(() => Product)
    createProduct(@Arg('input') input: CreateProductInput, @Ctx() context: Context) {
        const user = context.user!;
        return this.productService.createProduct({...input, user: user?._id})
    }

    @Query(() => [Product])//Array of Products
    products() {
        return this.productService.findProducts();
    }

    @Query(() => Product)//Single Product no need of [Product] Array
    product(@Arg('input') input: GetProductInput) {
        return this.productService.findSingleProduct(input);
    }
} 