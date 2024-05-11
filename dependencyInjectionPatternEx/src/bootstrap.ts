import 'dotenv/config'
import 'reflect-metadata'
import { App } from './application';
import './controllers/UsersController';
import './controllers/AuthController';
import './controllers/VideosController';
import './controllers/CommentsController';

console.clear()

export async function bootstrap() {
  new App().setup()
}

bootstrap();