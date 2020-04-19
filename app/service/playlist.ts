import { Service } from 'egg';
import createRequest from '../utils/createRequest';

/**
 * playlist Service
 */
export default class Playlist extends Service {
  /**
   * @description 获取歌单 分类列表
   */
  public async getPlaylistCatgorys(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/catalogue`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
