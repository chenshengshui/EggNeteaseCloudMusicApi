import { Controller } from 'egg';

import { Default_PageNumber, Default_PageSize } from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 拉取歌手列表
   */
  public async getArtistList() {
    const { ctx } = this;
    const { categoryCode, page, pageSize, initial } = ctx.query;
    ctx.body = await ctx.service.artist.getArtistList({
      categoryCode,
      page,
      pageSize,
      initial,
    });
  }

  /**
   * @description 获取歌手信息
   */
  public async getArtistInfo() {
    const { ctx } = this;
    const { artistId } = ctx.params;
    ctx.body = await ctx.service.artist.getArtistInfo({
      artistId,
    });
  }

  /**
   * @description 获取歌手专辑
   */
  public async getArtistAlbums() {
    const { ctx } = this;
    const {
      pageSize = Default_PageSize,
      page = Default_PageNumber,
    } = ctx.query;
    const { artistId } = ctx.params;

    ctx.body = await ctx.service.artist.getArtistAlbums({
      artistId,
      page,
      pageSize,
    });
  }
}
