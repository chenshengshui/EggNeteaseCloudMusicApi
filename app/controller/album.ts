import { Controller } from 'egg';

export default class ArtistController extends Controller {
  /**
   * @description 获取专辑动态信息
   */
  public async getAlbumDynamicInfo() {
    const { ctx } = this;
    const { albumId } = ctx.query;
    ctx.body = await ctx.service.album.getAlbumDynamicInfo({
      albumId,
    });
  }

  /**
   *
   */
  public async getLatestAlbum() {
    const { ctx } = this;

    ctx.body = await ctx.service.album.getLatestAlbum();
  }
}
