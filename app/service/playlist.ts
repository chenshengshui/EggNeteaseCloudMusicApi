import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import { iPostPlaylistCreate } from './types/playlist';

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

  /**
   * @description 创建歌单
   * @param name
   * @param privacy
   * 0 为普通歌单，10 为隐私歌单
   */
  public async postPlaylistCreate({
    name,
    privacy,
  }: iPostPlaylistCreate): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/create`,
      {
        name,
        privacy,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
