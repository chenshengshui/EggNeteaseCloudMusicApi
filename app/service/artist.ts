import { Service } from 'egg';
import {
  iGetArtistList,
  iGetArtistBrief,
  iGetArtistInfo,
  iGetArtistArts,
  iGetArtistTopSong,
  iPostArtistSub,
  iPageParams,
} from './artist.d';
import createRequest from '../utils/createRequest';

/**
 * Artist Service
 */
export default class Artist extends Service {
  /**
   * @description 获取歌手列表
   * @param categoryCode 类别code
   * @param initial 排序规则
   * @param page
   * @param pageSize
   */
  public async getArtistList({
    categoryCode,
    page,
    pageSize,
    initial,
  }: iGetArtistList): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    const data = {
      categoryCode: categoryCode,
      initial: isNaN(initial as number)
        ? ((initial || '') as string).toUpperCase().charCodeAt(0) || undefined
        : initial,
      offset: page,
      limit: pageSize,
      total: true,
    };
    return createRequest(
      'POST',
      `https://music.163.com/api/v1/artist/list`,
      data,
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取歌手简介
   * @param artistId 歌手ID
   */
  public async getArtistBrief({ artistId }: iGetArtistBrief): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/artist/introduction`,
      {
        id: artistId,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取歌手信息
   * @param artistId 歌手ID
   */
  public async getArtistInfo({ artistId }: iGetArtistInfo): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/v1/artist/${artistId}`,
      {
        id: artistId,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取歌手专辑
   * @param artistId 歌手ID
   * @param page
   * @param pageSize
   */
  public async getArtistAlbums({
    artistId,
    page,
    pageSize,
  }: iGetArtistArts): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/artist/albums/${artistId}`,
      {
        limit: pageSize,
        offset: page,
        total: true,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取歌手MV
   * @param artistId 歌手ID
   * @param page
   * @param pageSize
   */
  public async getArtistMv({
    artistId,
    page,
    pageSize,
  }: iGetArtistArts): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/artist/mvs`,
      {
        artistId,
        limit: pageSize,
        offset: page,
        total: true,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取歌手50首流行歌曲
   * @param artistId 歌手ID
   */
  public async getArtistTopSong({ artistId }: iGetArtistTopSong): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/api/artist/top/song`,
      {
        id: artistId,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 收藏｜取消收藏歌手
   * @param artistId 歌手ID
   * @param actionType 收藏或取消 sub ｜ unsub
   */
  public async postArtistSub({ artistId, actionType }: iPostArtistSub) {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/artist/${actionType}`,
      {
        artistId,
        artistIds: '[' + artistId + ']',
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取订阅歌手列表
   * @param page
   * @param pageSize
   */
  public async getArtistSublist({ page, pageSize }: iPageParams) {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/artist/sublist`,
      {
        limit: pageSize,
        offset: page,
        total: true,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }
}
