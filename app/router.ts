import { Application } from 'egg';

import ArtistRouter from './router/artist';
import AlbumRouter from './router/album';
import LoginRouter from './router/login';
import UserRouter from './router/user';
import VideoRouter from './router/video';

export default (app: Application) => {
  LoginRouter(app);
  ArtistRouter(app);
  AlbumRouter(app);
  UserRouter(app);
  VideoRouter(app);
};
