import { Controller } from 'egg';

import { Default_PageNumber, Default_PageSize } from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 获取某个歌手的单曲
   */
  public async getArtistAlbums() {
    const { ctx } = this;
    const {
      pageSize = Default_PageSize,
      page = Default_PageNumber,
    } = ctx.query;
    const { id } = ctx.params;

    ctx.body = await ctx.service.artist.getArtistAlbums({
      id,
      page,
      pageSize,
    });
  }
}
