import { Service } from 'egg';

import createRequest from '../utils/createRequest';

/**
 * User Service
 */
export default class User extends Service {
  public async getAudios({ userId }) {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/get/byuser`,
      {
        userId: userId,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }
}
