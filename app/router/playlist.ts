import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/playlist/catgory/list', controller.playlist.getPlaylistCatgorys);
  router.post('/playlist/create', controller.playlist.postPlaylistCreate);
  router.delete('/playlist/delete', controller.playlist.deletePlaylist);
  router.put('/playlist/des/update', controller.playlist.updatePlaylistDes);
  router.get('/playlist/detail', controller.playlist.getPlaylistDetail);
  router.get('/playlist/hot', controller.playlist.getHotPlaylist);
  router.put('/playlist/name/update', controller.playlist.updatePlaylistName);
  router.post(
    '/playlist/:pid/sub/:actionType',
    controller.playlist.postPlaylistSub
  );
  router.get(
    '/playlist/:pid/subscribers',
    controller.playlist.getPlaylistSubcribers
  );
  router.put(
    '/playlist/:pid/tags/update',
    controller.playlist.updatePlaylistTags
  );
  router.post('/playlist/:pid/songs/add', controller.playlist.addPlaylistSongs);
  router.delete(
    '/playlist/:pid/songs/del',
    controller.playlist.deletePlaylistSongs
  );
  router.put('/playlist/:pid/update', controller.playlist.updatePlaylist);
};
