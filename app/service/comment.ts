import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import { iGetResourceComments, Comment_Resource_Type } from './types/comment';

/**
 * Album Service
 */
export default class Album extends Service {
  /**
   * @description 获取资源评论
   */
  public async getResourceComments({
    type,
    resourceId,
    beforeTime,
    page,
    pageSize,
  }: iGetResourceComments): Promise<any> {
    const { ctx } = this;

    const query: any = ctx.request.query;
    query.cookie.os = 'pc';
    let resouceType: string = Comment_Resource_Type[type];
    if (type === 'event') {
      resouceType = '';
    }

    return createRequest(
      'POST',
      `https://music.163.com/weapi/v1/resource/comments/${resouceType}${resourceId}`,
      {
        rid: resourceId,
        limit: pageSize,
        offset: page,
        beforeTime,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取资源热门评论
   */
  public async getResourceHotComments({
    type,
    resourceId,
    beforeTime,
    page,
    pageSize,
  }: iGetResourceComments): Promise<any> {
    const { ctx } = this;

    const query: any = ctx.request.query;
    query.cookie.os = 'pc';

    return createRequest(
      'POST',
      `https://music.163.com/weapi/v1/resource/hotcomments/${Comment_Resource_Type[type]}${resourceId}`,
      {
        rid: resourceId,
        limit: pageSize,
        offset: page,
        beforeTime,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取评论热墙
   */
  public async getCommentHotwall(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/comment/hotwall/list/get`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
