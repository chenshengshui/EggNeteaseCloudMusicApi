import { Controller } from 'egg';
import { Default_Offset, Default_Limit } from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 拉取歌手列表
   */
  public async getArtistList() {
    const { ctx } = this;
    const { categoryCode, offset, limit, initial } = ctx.query;
    ctx.body = await ctx.service.artist.getArtistList({
      categoryCode,
      offset,
      limit,
      initial,
    });
  }

  /**
   * @description 获取歌手简介
   */
  public async getArtistBrief() {
    const { ctx } = this;
    const { artistId } = ctx.params;
    ctx.body = await ctx.service.artist.getArtistBrief({
      artistId,
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
    const { limit = Default_Limit, offset = Default_Offset } = ctx.query;
    const { artistId } = ctx.params;

    ctx.body = await ctx.service.artist.getArtistAlbums({
      artistId,
      offset,
      limit,
    });
  }

  /**
   * @description 获取歌手MV
   */
  public async getArtistMv() {
    const { ctx } = this;
    const { limit = Default_Limit, offset = Default_Offset } = ctx.query;
    const { artistId } = ctx.params;

    ctx.body = await ctx.service.artist.getArtistMv({
      artistId,
      offset,
      limit,
    });
  }

  /**
   * @description 获取歌手50首流行歌曲
   */
  public async getArtistTopSong() {
    const { ctx } = this;
    const { artistId } = ctx.params;

    ctx.body = await ctx.service.artist.getArtistTopSong({
      artistId,
    });
  }

  /**
   * @description 收藏｜取消收藏歌手
   */
  public async postArtistSub() {
    const { ctx } = this;
    const { artistId, actionType } = ctx.params;

    ctx.body = await ctx.service.artist.postArtistSub({
      artistId,
      actionType,
    });
  }

  /**
   * @description 获取订阅歌手列表
   */
  public async getArtistSublist() {
    const { ctx } = this;
    const { limit = Default_Limit, offset = Default_Offset } = ctx.query;

    ctx.body = await ctx.service.artist.getArtistSublist({
      offset,
      limit,
    });
  }
}
