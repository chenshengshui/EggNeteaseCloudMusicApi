import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import { iGetTopAlbum, AlbumArea } from './types/top';

/**
 * Top Service
 */
export default class Top extends Service {
  /**
   * @description 获取最新专辑
   * @param page
   * @param pageSize
   * @param area
   */
  public async getTopAlbum({
    page,
    pageSize,
    area = AlbumArea['ALL'],
  }: iGetTopAlbum): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/album/new`,
      {
        offset: page,
        limit: pageSize,
        area,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
