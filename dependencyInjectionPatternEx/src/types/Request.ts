import { Request } from 'express';
import { Payload } from './Payload';
import Context from './Context';
import { VideoDocument } from './Video';


export type request = Request & Payload & Context;