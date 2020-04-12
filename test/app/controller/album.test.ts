import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/album.test.ts', () => {
  it('getAlbumDynamicInfo', async () => {
    await app.httpRequest().get('/album/86286082/detail/dynamic').expect(200);
  });
});
