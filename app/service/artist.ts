import { Service } from 'egg';

import createRequest from '../utils/createRequest';

/**
 * Artist Service
 */
export default class Artist extends Service {
  public async getArtistInfo({ id }) {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/artist/introduction`,
      {
        id: id,
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
