import { Container } from 'inversify'
import { DBService } from '../service/DBService'
import { UserRepository } from '../repository/UserRepository';
import { UserService } from '../service/UserService';
import { VideoRepository } from '../repository/VideoRepository';
import { VideoService } from '../service/VideoService';
import { CommentRepository } from '../repository/CommentRepository';
import { CommentService } from '../service/CommentService';

export const container = new Container({
  defaultScope: 'Singleton',
})

container.bind(DBService).toSelf();
container.bind(UserRepository).toSelf();
container.bind(UserService).toSelf();
container.bind(VideoRepository).toSelf();
container.bind(VideoService).toSelf();
container.bind(CommentRepository).toSelf();
container.bind(CommentService).toSelf();