import { Controller } from 'egg';
import { Default_PageNumber, Default_PageSize } from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 获取资源评论
   */
  public async getResourceComments() {
    const { ctx } = this;
    const { resourceId } = ctx.params;
    const {
      type,
      beforeTime = 0,
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;
    ctx.body = await ctx.service.comment.getResourceComments({
      type,
      resourceId,
      beforeTime,
      page,
      pageSize,
    });
  }

  /**
   * @description 获取动态评论
   */
  public async getEventComments() {
    const { ctx } = this;
    const { eventId } = ctx.params;
    const {
      beforeTime = 0,
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;
    ctx.body = await ctx.service.comment.getEventComments({
      eventId,
      beforeTime,
      page,
      pageSize,
    });
  }
}
