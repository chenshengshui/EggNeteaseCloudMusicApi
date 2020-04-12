import { Service } from 'egg';
import { iGetArtistList, iGetArtistInfo } from './artist.d';
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
  }: iGetArtistList) {
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

  public async getArtistInfo({ artistId }: iGetArtistInfo) {
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

  public async getArtistAlbums({ id, page, pageSize }) {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/artist/albums/${id}`,
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
