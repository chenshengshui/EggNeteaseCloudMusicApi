import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import {
  iGetTopAlbum,
  AlbumArea,
  iPageParams,
  iGetTopList,
  TopList,
  iGetTopMv,
  iGetQualityPlaylist,
  iGetTopPlaylist,
  iGetTopSongs,
  Area,
  iGetArtistToplist,
} from './types/top';

/**
 * Top Service
 */
export default class Top extends Service {
  /**
   * @description 获取最新专辑
   * @param offset
   * @param limit
   * @param area
   */
  public async getTopAlbum({
    offset,
    limit,
    area = AlbumArea['ALL'],
  }: iGetTopAlbum): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/album/new`,
      {
        offset: offset,
        limit: limit,
        area,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取最新专辑
   * @param offset
   * @param limit
   */
  public async getTopArtist({ offset, limit }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/artist/top`,
      {
        offset: offset,
        limit: limit,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取新歌列表
   * @param type
   */
  public async getTopList({ type }: iGetTopList): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/v3/playlist/detail`,
      {
        id: TopList[type],
        n: 1000,
      },
      { crypto: 'linuxapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取MV排行榜
   * @param offset
   * @param limit
   * @param area
   */
  public async getTopMv({ offset, limit, area }: iGetTopMv): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/mv/toplist`,
      {
        offset: offset,
        limit: limit,
        area,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取MV排行榜
   * @param offset
   * @param limit
   * @param area
   */
  public async getQualityPlaylist({
    lasttime,
    limit,
    category,
  }: iGetQualityPlaylist): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/highquality/list`,
      {
        cat: category,
        limit: limit,
        lasttime,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取歌单排行榜
   * @param category
   * @param offset
   * @param limit
   * @param order
   */
  public async getTopPlaylist({
    category,
    offset,
    limit,
    order,
  }: iGetTopPlaylist): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/list`,
      {
        cat: category,
        offset: offset,
        limit: limit,
        order,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取新歌排行榜
   * @param area
   */
  public async getTopSongs({ area }: iGetTopSongs): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/v1/discovery/new/songs`,
      {
        areaId: Area[area],
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取新歌排行榜
   * @param area
   */
  public async getArtistToplist({ type }: iGetArtistToplist): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/toplist/artist`,
      {
        type,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取新歌排行榜
   * @param area
   */
  public async getToplistDetail(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/toplist/detail`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 榜单介绍
   */
  public async getToplistIntroduction(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/toplist`,
      {},
      { crypto: 'linuxapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
