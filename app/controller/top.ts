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

  /**
   * @description 获取新歌列表
   */
  public async getTopList() {
    const { ctx } = this;
    const { type } = ctx.query;

    ctx.body = await ctx.service.top.getTopList({
      type,
    });
  }

  /**
   * @description 获取MV排行榜
   */
  public async getTopMv() {
    const { ctx } = this;
    const {
      area,
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;

    ctx.body = await ctx.service.top.getTopMv({
      area,
      page,
      pageSize,
    });
  }
}
