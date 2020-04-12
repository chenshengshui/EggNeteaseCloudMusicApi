import { Application } from 'egg';

import artistRouter from './router/artist';
import AlbumRouter from './router/artist';
import LoginRouter from './router/login';
import UserRouter from './router/user';

export default (app: Application) => {
  LoginRouter(app);
  artistRouter(app);
  AlbumRouter(app);
  UserRouter(app);
};
