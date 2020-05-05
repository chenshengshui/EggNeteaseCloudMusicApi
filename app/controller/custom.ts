import { Controller } from 'egg';

export default class CustomController extends Controller {
  /**
   * @description 获取城市列表
   */
  public async getCustomCitylist() {
    const { ctx } = this;

    ctx.body = await ctx.service.custom.getCustomCitylist();
  }
}
