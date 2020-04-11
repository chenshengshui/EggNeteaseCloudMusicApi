import { Controller } from 'egg';

export default class UserController extends Controller {
  /**
   * 获取用户电台
   */
  public async getAudios() {
    const { ctx } = this;
    const { userId } = ctx.params;

    ctx.body = await ctx.service.user.getAudios({
      userId: userId,
    });
  }
}
