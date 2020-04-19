import { Application } from 'egg';

import ArtistRouter from './router/artist';
import AlbumRouter from './router/album';
import LoginRouter from './router/login';
import UserRouter from './router/user';
import VideoRouter from './router/video';
import DjRouter from './router/dj';
import PlaylistRouter from './router/playlist';

export default (app: Application) => {
  LoginRouter(app);
  ArtistRouter(app);
  AlbumRouter(app);
  UserRouter(app);
  VideoRouter(app);
  DjRouter(app);
  PlaylistRouter(app);
};
