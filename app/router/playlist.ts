import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/playlist/catgory/list', controller.playlist.getPlaylistCatgorys);
  router.post('/playlist/create', controller.playlist.postPlaylistCreate);
  router.delete('/playlist/delete', controller.playlist.deletePlaylist);
  router.put('/playlist/des/update', controller.playlist.updatePlaylistDes);
};
