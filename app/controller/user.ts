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

  /**
   * @description 删除用户云盘歌曲
   */
  public async deleteCloudMusic() {
    const { ctx } = this;
    const { ids } = ctx.body;

    ctx.body = await ctx.service.user.deleteCloudMusic({
      ids,
    });
  }

  /**
   * @description 删除用户云盘歌曲
   */
  public async getCloudMusicsInfo() {
    const { ctx } = this;
    const { ids } = ctx.query;
    const songIds = ids.replace(/\s/g, '').split(',');

    ctx.body = await ctx.service.user.getCloudMusicsInfo({
      ids: songIds,
    });
  }
}
