import { Controller } from 'egg';

import {
  Default_PageNumber,
  Default_PageSize,
  Default_MvArea,
  Defult_MvType,
  Default_MvOrder,
  Default_Resolution,
} from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 获取mv列表
   */
  public async getMvList() {
    const { ctx } = this;
    const {
      area = Default_MvArea,
      type = Defult_MvType,
      order = Default_MvOrder,
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;

    ctx.body = await ctx.service.mv.getMvList({
      area,
      type,
      order,
      page,
      pageSize,
    });
  }

  /**
   * @description 获取mv详情
   */
  public async getMvDetail() {
    const { ctx } = this;
    const { mvId } = ctx.params;

    ctx.body = await ctx.service.mv.getMvDetail({
      mvId,
    });
  }

  /**
   * @description 获取网易出品mv
   */
  public async getWyMv() {
    const { ctx } = this;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;

    ctx.body = await ctx.service.mv.getWyMv({
      page,
      pageSize,
    });
  }

  /**
   * @description 获取最新mv
   */
  public async getLatestMv() {
    const { ctx } = this;
    const { area = Default_MvArea, pageSize = Default_PageSize } = ctx.query;

    ctx.body = await ctx.service.mv.getLatestMv({
      area,
      pageSize,
    });
  }

  /**
   * @description 收藏 ｜ 取消收藏 Mv
   */
  public async postMvSub() {
    const { ctx } = this;
    const { mvId, actionType } = ctx.params;

    ctx.body = await ctx.service.mv.postMvSub({
      mvId,
      actionType,
    });
  }

  /**
   * @description 获取mv收藏列表
   */
  public async getMvSublist() {
    const { ctx } = this;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;

    ctx.body = await ctx.service.mv.getMvSublist({
      page,
      pageSize,
    });
  }

  /**
   * @description 获取mv Url
   */
  public async getMvUrl() {
    const { ctx } = this;
    const { mvId, resolution = Default_Resolution } = ctx.query;

    ctx.body = await ctx.service.mv.getMvUrl({
      mvId,
      resolution,
    });
  }
}
