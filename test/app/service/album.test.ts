import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/album.test.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('getAlbumDynamicInfo', async () => {
    const result = await ctx.service.album.getAlbumDynamicInfo({
      albumId: '86286082',
    });
    assert(result.status === 200);
  });
});
