import { Controller } from 'egg';
import { Default_PageNumber, Default_PageSize } from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 获取电台 banner
   */
  public async getDjBanner() {
    const { ctx } = this;
    ctx.body = await ctx.service.dj.getDjBanner();
  }

  /**
   * @description 获取电台非热门分类
   */
  public async getNonHotCategory() {
    const { ctx } = this;
    ctx.body = await ctx.service.dj.getNonHotCategory();
  }

  /**
   * @description 获取电台推荐分类
   */
  public async getRecCategory() {
    const { ctx } = this;
    ctx.body = await ctx.service.dj.getRecCategory();
  }

  /**
   * @description 获取电台分类列表
   */
  public async getCategoryList() {
    const { ctx } = this;
    ctx.body = await ctx.service.dj.getCategoryList();
  }

  /**
   * @description 获取电台分类列表
   */
  public async getDjDetail() {
    const { ctx } = this;
    const { djId } = ctx.params;
    ctx.body = await ctx.service.dj.getDjDetail({
      djId,
    });
  }

  /**
   * @description 获取热门电台
   */
  public async getHotDjs() {
    const { ctx } = this;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;
    ctx.body = await ctx.service.dj.getHotDjs({
      page,
      pageSize,
    });
  }

  /**
   * @description 获取付费电台
   */
  public async getPaygiftDjs() {
    const { ctx } = this;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;
    ctx.body = await ctx.service.dj.getPaygiftDjs({
      page,
      pageSize,
    });
  }

  /**
   * @description 获取电台节目详情
   */
  public async getDjProgramDetail() {
    const { ctx } = this;
    const { djId } = ctx.params;
    ctx.body = await ctx.service.dj.getDjProgramDetail({
      djId,
    });
  }

  /**
   * @description 获取电台24
   */
  public async getDjToplistHoursProgram() {
    const { ctx } = this;
    const { pageSize } = ctx.query;
    ctx.body = await ctx.service.dj.getDjToplistHoursProgram({
      pageSize,
    });
  }
}
