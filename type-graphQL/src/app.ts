import express from 'express';
import { buildSchema } from "type-graphql"
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import 'apollo-server';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express/dist/ApolloServer';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';
import { resolvers } from './resolvers/index';
import connect from './utils/connect';
import logger from './utils/logger';
import cors from 'cors';
import config from 'config';
import { verifyJwt } from './utils/jwt';
import { User } from './Schema/User';
import Context from './types/context';
import authChecker from './utils/authChecker'
dotenv.config();

async function bootstrap() {
    const schema = await buildSchema({
        resolvers,
        authChecker,
    })

    //Init express
    const app = express();
    app.use(express.json());
    app.use(cors({ origin:"http://localhost:9500", credentials:true }))
    app.use(cookieParser());


    //Create the apollo server
    const server = new ApolloServer({
        schema,
        context: (ctx: Context) => {
            const context = ctx;
            if(ctx.req.cookies.accessToken) {
                const user = verifyJwt<User>(ctx.req.cookies.accessToken);
                console.log("user : " + JSON.stringify(user));
                context.user = user;
            }
            return context;
        },
        plugins: [
            process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault()
            : ApolloServerPluginLandingPageGraphQLPlayground()
        ],
    });

    await server.start();

    //apply middleware
    server.applyMiddleware({ app });

    const PORT = config.get<number>("port");;

    app.listen({ port: PORT }, async () => {
        logger.info(`App Started Listening on ${PORT}`)

        await connect();
    })
}

bootstrap();

// class App {
//     public app: express.Application;
    

//     constructor(){
//         this.app = express();
//         this.config();
//         this.bootstrap();
//     }

//     private async bootstrap():Promise<void> {
//         const schema = await buildSchema({
//             resolvers,
//             //authChecker
//         })

//         //Create the apollo server
//         const server:any = new ApolloServer({
//             schema,
//             context: (ctx) => {
//                 console.log(ctx)
//                 return ctx
//             },
//             plugins: [
//                 // process.env.NODE_ENV === 'production' 
//                 // ? ApolloServerPluginLandingPageProductionDefault()
//                 ApolloServerPluginLandingPageLocalDefault()
//             ],
//         });

//         await server.start();

//         //apply middleware
//         server.applyMiddleware({app: express.application});
//     }

//     private config():void{
//         this.app.use(express.json());
//         this.app.use(cookieParser());
//         this.app.use(cors({ origin:true, credentials:true }));
//     }
    
// }

// export default new App().app;