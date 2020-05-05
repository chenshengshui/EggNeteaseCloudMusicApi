import { Service } from 'egg';
import createRequest from '../utils/createRequest';

/**
 * Custom Service
 */
export default class Custom extends Service {
  /**
   * @description 获取城市列表
   */
  public async getCustomCitylist(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/appcustomconfig/get`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
