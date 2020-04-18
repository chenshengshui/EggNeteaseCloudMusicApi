import { Controller } from 'egg';

export default class VideoController extends Controller {
  /**
   * @description 获取视频信息
   */
  public async getVideoInfo() {
    const { ctx } = this;
    const { videoId } = ctx.params;
    await ctx.service.video.getVideoInfo({
      videoId,
    });
  }
}
