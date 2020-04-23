import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import { iGetMvList, MvOrder, MvType, iMvId } from './types/mv';

/**
 * Mv Service
 */
export default class Mv extends Service {
  /**
   * @description 获取mv列表
   * @param area
   * @param type
   * @param order
   * @param page
   * @param pageSize
   */
  public async getMvList({
    area,
    type = 0,
    order = 1,
    page,
    pageSize,
  }: iGetMvList): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://interface.music.163.com/api/mv/all`,
      {
        tags: JSON.stringify({
          地区: area,
          类型: MvType[type],
          排序: MvOrder[order],
        }),
        offset: page,
        limit: pageSize,
        total: 'true',
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取mv详情
   * @param mvId
   */
  public async getMvDetail({ mvId }: iMvId): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/mv/detail`,
      {
        id: mvId,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
