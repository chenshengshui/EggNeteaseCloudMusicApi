import { Controller } from 'egg';
import { Default_PageNumber, Default_PageSize } from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 获取专辑动态信息
   */
  public async getAlbumDynamicInfo() {
    const { ctx } = this;
    const { albumId } = ctx.params;
    try {
      ctx.body = await ctx.service.album.getAlbumDynamicInfo({
        albumId,
      });
    } catch (error) {
      console.log(error, 'sdsds');
    }
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

  /**
   * @description 获取收藏专辑列表
   */
  public async getAlbumSublist() {
    const { ctx } = this;
    const {
      pageSize = Default_PageSize,
      page = Default_PageNumber,
    } = ctx.query;

    ctx.body = await ctx.service.album.getAlbumSublist({
      page,
      pageSize,
    });
  }
}
