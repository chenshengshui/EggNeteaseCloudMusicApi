import { Controller } from 'egg';
import { Default_PageNumber, Default_PageSize } from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 获取专辑动态信息
   */
  public async getTopAlbum() {
    const { ctx } = this;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
      area = 'ALL',
    } = ctx.query;

    ctx.body = await ctx.service.top.getTopAlbum({
      page,
      pageSize,
      area,
    });
  }

  /**
   * @description 获取热门歌手
   */
  public async getTopArtist() {
    const { ctx } = this;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;

    ctx.body = await ctx.service.top.getTopArtist({
      page,
      pageSize,
    });
  }
}
