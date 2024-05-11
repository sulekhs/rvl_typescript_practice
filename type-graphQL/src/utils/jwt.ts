import config from 'config';
import jwt from 'jsonwebtoken';

// const publicKey = config.get<string>('publicKey');
// const privateKey = config.get<string>('privateKey');
const publicKey = Buffer.from(config.get<string>("publicKey"),"base64").toString("ascii");
const privateKey = Buffer.from(config.get<string>("privateKey"),"base64").toString("ascii");

//console.log(publicKey);
//console.log(privateKey);

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    console.log("object in signJwt : " + JSON.stringify(object))
    return jwt.sign(object, privateKey , {
        ...(options && options), //algorithm: 'none'
        algorithm: 'RS256'
    })
}

export function verifyJwt<T>(token: string): T | null {
    try {
        const decoded = jwt.verify(token, publicKey) as T;
        console.log("decoded : " + JSON.stringify(decoded));
        return decoded;
    } catch (e: any) {
        return null;
    }
}