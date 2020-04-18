import { Controller } from 'egg';

export default class ArtistController extends Controller {
  /**
   * @description 获取电台 banner
   */
  public async getDjBanner() {
    const { ctx } = this;
    ctx.body = await ctx.service.dj.getDjBanner();
  }

  public async getNonHotCategory() {
    const { ctx } = this;
    ctx.body = await ctx.service.dj.getNonHotCategory();
  }
}
