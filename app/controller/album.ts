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
   * @description 获取最新专辑
   */
  public async getLatestAlbum() {
    const { ctx } = this;

    ctx.body = await ctx.service.album.getLatestAlbum();
  }

  /**
   * @description 收藏｜取消收藏 专辑
   */
  public async postAlbumSub() {
    const { ctx } = this;
    const { albumId, actionType } = ctx.params;

    ctx.body = await ctx.service.album.postAlbumSub({
      albumId,
      actionType,
    });
  }
}
