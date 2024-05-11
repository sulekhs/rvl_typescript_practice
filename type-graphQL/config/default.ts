import * as dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URL,
    saltWorkFactor: process.env.SALTFACTORY,
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
}