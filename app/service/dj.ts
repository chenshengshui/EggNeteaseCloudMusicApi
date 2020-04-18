import { Service } from 'egg';
import createRequest from '../utils/createRequest';

/**
 * dj Service
 */
export default class Dj extends Service {
  /**
   * @description 获取电台 banner
   */
  public async getDjBanner(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `http://music.163.com/weapi/djradio/banner/get`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
