import { Controller } from 'egg';

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
}
