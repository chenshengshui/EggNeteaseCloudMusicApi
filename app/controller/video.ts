import { Controller } from 'egg';

export default class VideoController extends Controller {
  /**
   * @description 获取视频信息
   */
  public async getVideoInfo() {
    const { ctx } = this;
    const { videoId } = ctx.params;
    ctx.body = await ctx.service.video.getVideoInfo({
      videoId,
    });
  }

  /**
   * @description 获取视频分组列表
   */
  public async getVideoGroupList() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.video.getVideoGroupList();
    } catch (error) {
      console.log(error, 'hh');
    }
  }
}
