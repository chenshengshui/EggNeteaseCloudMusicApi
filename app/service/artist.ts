import { Service } from 'egg';
import { iGetArtistList, iGetArtistInfo, iGetArtistAlbums } from './artist.d';
import createRequest from '../utils/createRequest';

/**
 * Artist Service
 */
export default class Artist extends Service {
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

  public async getArtistInfo({ artistId }: iGetArtistInfo): Promise<any> {
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

  public async getArtistAlbums({
    artistId,
    page,
    pageSize,
  }: iGetArtistAlbums): Promise<any> {
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
}
