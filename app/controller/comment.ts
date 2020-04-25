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
   * @description 获取资源热门评论
   */
  public async getResourceHotComments() {
    const { ctx } = this;
    const { resourceId } = ctx.params;
    const {
      type,
      beforeTime = 0,
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;
    ctx.body = await ctx.service.comment.getResourceHotComments({
      type,
      resourceId,
      beforeTime,
      page,
      pageSize,
    });
  }

  /**
   * @description 获取资源热门评论
   */
  public async getCommentHotwall() {
    const { ctx } = this;

    ctx.body = await ctx.service.comment.getCommentHotwall();
  }
}
