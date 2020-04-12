import { Application } from 'egg';

import ArtistRouter from './router/artist';
import AlbumRouter from './router/album';
import LoginRouter from './router/login';
import UserRouter from './router/user';

export default (app: Application) => {
  LoginRouter(app);
  ArtistRouter(app);
  AlbumRouter(app);
  UserRouter(app);
};
