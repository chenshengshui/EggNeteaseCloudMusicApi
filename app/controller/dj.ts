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
    const { pageSize = Default_PageSize } = ctx.query;
    ctx.body = await ctx.service.dj.getDjToplistHoursProgram({
      pageSize,
    });
  }

  /**
   * @description 获取电台节目榜单
   */
  public async getDjToplistProgram() {
    const { ctx } = this;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;
    ctx.body = await ctx.service.dj.getDjToplistProgram({
      page,
      pageSize,
    });
  }

  /**
   * @description 获取电台节目列表
   */
  public async getDjProgramList() {
    const { ctx } = this;
    const { djId } = ctx.params;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
      asc,
    } = ctx.query;
    ctx.body = await ctx.service.dj.getDjProgramList({
      page,
      pageSize,
      djId,
      asc,
    });
  }

  /**
   * @description 获取分类热门电台
   */
  public async getCatgoryHotDjs() {
    const { ctx } = this;
    const { catgoryId } = ctx.params;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;
    ctx.body = await ctx.service.dj.getCatgoryHotDjs({
      page,
      pageSize,
      catgoryId,
    });
  }

  /**
   * @description 获取分类热门电台
   */
  public async getTypeRecDjs() {
    const { ctx } = this;
    const { typeId } = ctx.params;
    ctx.body = await ctx.service.dj.getTypeRecDjs({
      typeId,
    });
  }

  /**
   * @description 获取推荐电台
   */
  public async getRecDjs() {
    const { ctx } = this;
    ctx.body = await ctx.service.dj.getRecDjs();
  }

  /**
   * @description 订阅 ｜ 取消订阅 电台
   */
  public async postDjSub() {
    const { ctx } = this;
    const { djId, actionType } = ctx.params;
    ctx.body = await ctx.service.dj.postDjSub({ djId, actionType });
  }

  /**
   * @description 获取订阅电台列表
   */
  public async getDjSublist() {
    const { ctx } = this;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;
    ctx.body = await ctx.service.dj.getDjSublist({ page, pageSize });
  }
}
