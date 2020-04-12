import { Service } from 'egg';

import createRequest from '../utils/createRequest';

import { iGetAlbumDynamicInfo, iPostAlbumSub, iPageParams } from './album.d';

/**
 * Album Service
 */
export default class Album extends Service {
  /**
   * @description 获取专辑动态信息
   * @param albumId 专辑ID
   */
  public async getAlbumDynamicInfo({
    albumId,
  }: iGetAlbumDynamicInfo): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/album/detail/dynamic`,
      {
        id: albumId,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取最新专辑
   */
  public async getLatestAlbum(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/discovery/newAlbum`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 收藏 ｜ 取消收藏 专辑
   * @param albumId
   * @param actionType
   */
  public async postAlbumSub({
    albumId,
    actionType,
  }: iPostAlbumSub): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/album/${actionType}`,
      {
        id: albumId,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取收藏专辑列表
   * @param page
   * @param pageSize
   */
  public async getAlbumSublist({ page, pageSize }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/album/sublist`,
      {
        limit: pageSize,
        offset: page,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
