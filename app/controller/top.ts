import { Controller } from 'egg';
import { Default_Offset, Default_Limit } from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 专辑排行榜
   */
  public async getTopAlbum() {
    const { ctx } = this;
    const {
      offset = Default_Offset,
      limit = Default_Limit,
      area = 'ALL',
    } = ctx.query;

    ctx.body = await ctx.service.top.getTopAlbum({
      offset,
      limit,
      area,
    });
  }

  /**
   * @description 获取热门歌手
   */
  public async getTopArtist() {
    const { ctx } = this;
    const { offset = Default_Offset, limit = Default_Limit } = ctx.query;

    ctx.body = await ctx.service.top.getTopArtist({
      offset,
      limit,
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
      area = '全部',
      offset = Default_Offset,
      limit = Default_Limit,
    } = ctx.query;

    ctx.body = await ctx.service.top.getTopMv({
      area,
      offset,
      limit,
    });
  }

  /**
   * @description 获取高质量歌单排行榜
   */
  public async getQualityPlaylist() {
    const { ctx } = this;
    const { category, lasttime = 0, limit = Default_Limit } = ctx.query;

    ctx.body = await ctx.service.top.getQualityPlaylist({
      category,
      limit,
      lasttime,
    });
  }

  /**
   * @description 获取新歌排行榜
   */
  public async getTopPlaylist() {
    const { ctx } = this;
    const {
      category,
      order,
      offset = Default_Offset,
      limit = Default_Limit,
    } = ctx.query;

    ctx.body = await ctx.service.top.getTopPlaylist({
      category,
      offset,
      limit,
      order,
    });
  }

  /**
   * @description 新歌榜单
   */
  public async getTopSongs() {
    const { ctx } = this;
    const { area = '全部' } = ctx.query;

    ctx.body = await ctx.service.top.getTopSongs({
      area,
    });
  }

  /**
   * @description 获取歌手榜
   */
  public async getArtistToplist() {
    const { ctx } = this;
    const { type = 1 } = ctx.query;

    ctx.body = await ctx.service.top.getArtistToplist({
      type,
    });
  }

  /**
   * @description 所有榜单内容摘要
   */
  public async getToplistDetail() {
    const { ctx } = this;

    ctx.body = await ctx.service.top.getToplistDetail();
  }

  /**
   * @description 榜单介绍
   */
  public async getToplistIntroduction() {
    const { ctx } = this;

    ctx.body = await ctx.service.top.getToplistIntroduction();
  }
}
