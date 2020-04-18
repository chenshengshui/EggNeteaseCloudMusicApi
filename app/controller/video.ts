import { Controller } from 'egg';

import { Default_PageNumber, Default_Resolution } from '../utils/common';

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
    ctx.body = await ctx.service.video.getVideoGroupList();
  }

  /**
   * @description 获取视频分组下的视频
   */
  public async getVideoGroupVideos() {
    const { ctx } = this;
    const {
      groupId,
      page = Default_PageNumber,
      resolution = Default_Resolution,
    } = ctx.query;
    try {
      ctx.body = await ctx.service.video.getVideoGroupVideos({
        groupId,
        page,
        resolution,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description 收藏｜取消收藏 视频
   */
  public async postVideoSub() {
    const { ctx } = this;
    const { videoId, actionType } = ctx.params;

    ctx.body = await ctx.service.video.postVideoSub({
      videoId,
      actionType,
    });
  }
}
