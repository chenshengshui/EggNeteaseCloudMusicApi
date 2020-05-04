import { Controller } from 'egg';

import { Default_PageNumber, Default_PageSize } from '../utils/common';

export default class UserController extends Controller {
  /**
   * 获取用户电台
   */
  public async getAudios() {
    const { ctx } = this;
    const uid = ctx.cookies.get('userId');
    ctx.body = await ctx.service.user.getAudios({
      uid,
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
   * @description 获取用户云盘数据详情
   */
  public async getCloudMusicsInfo() {
    const { ctx } = this;
    const { ids } = ctx.query;
    const songIds = ids.replace(/\s/g, '').split(',');

    ctx.body = await ctx.service.user.getCloudMusicsInfo({
      ids: songIds,
    });
  }

  /**
   * @description 获取云盘音乐列表
   */
  public async getCloudMusics() {
    const { ctx } = this;
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;

    ctx.body = await ctx.service.user.getCloudMusics({
      page,
      pageSize,
    });
  }

  /**
   * @description 获取用户信息
   */
  public async getUserInfo() {
    const { ctx } = this;
    const uid = ctx.cookies.get('userId');
    ctx.body = await ctx.service.user.getUserInfo({
      uid,
    });
  }

  /**
   * @description 获取用户电台
   */
  public async getUserDjs() {
    const { ctx } = this;
    const uid = ctx.cookies.get('userId');
    ctx.body = await ctx.service.user.getUserDjs({
      uid,
    });
  }

  /**
   * @description 获取用户动态
   */
  public async getUserEvent() {
    const { ctx } = this;
    const uid = ctx.cookies.get('userId');
    const { lasttime = -1, pageSize = Default_PageSize } = ctx.query;
    ctx.body = await ctx.service.user.getUserEvent({
      uid,
      pageSize,
      lasttime,
    });
  }

  /**
   * @description 获取用户粉丝
   */
  public async getUserFolloweds() {
    const { ctx } = this;
    const uid = ctx.cookies.get('userId');
    const { lasttime = -1, pageSize = Default_PageSize } = ctx.query;
    ctx.body = await ctx.service.user.getUserFolloweds({
      uid,
      pageSize,
      lasttime,
    });
  }

  /**
   * @description 获取用户关注者
   */
  public async getUserFollows() {
    const { ctx } = this;
    const uid = ctx.cookies.get('userId');
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;
    ctx.body = await ctx.service.user.getUserFollows({
      uid,
      page,
      pageSize,
    });
  }

  /**
   * @description 获取用户播放列表
   */
  public async getUserPlaylist() {
    const { ctx } = this;
    const uid = ctx.cookies.get('userId');
    const {
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;
    ctx.body = await ctx.service.user.getUserPlaylist({
      uid,
      page,
      pageSize,
    });
  }

  /**
   * @description 获取用户播放记录
   */
  public async getUserPlayrecord() {
    const { ctx } = this;
    const uid = ctx.cookies.get('userId');
    const { type = 1 } = ctx.query;
    ctx.body = await ctx.service.user.getUserPlayrecord({
      uid,
      type,
    });
  }

  /**
   * @description 获取用户收藏计数
   */
  public async getUserSubcount() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUserSubcount();
  }

  /**
   * @description 更新用户信息
   */
  public async putUserInfo() {
    const { ctx } = this;
    const { birthday, city, gender, nickname, province, signature } = ctx.body;
    ctx.body = await ctx.service.user.putUserInfo({
      birthday,
      city,
      gender,
      nickname,
      province,
      signature,
    });
  }

  /**
   * @description 获取用户操作记录
   */
  public async getUserLogs() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUserLogs();
  }

  /**
   * @description 获取用户FM
   */
  public async getUserFM() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUserFM();
  }

  /**
   * @description 获取用户Djprogram
   */
  public async getUserDjprogram() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUserDjprogram();
  }

  /**
   * @description 获取用户Mv
   */
  public async getUserMv() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUserMv();
  }

  /**
   * @description 获取用户新歌
   */
  public async getUserMewsong() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUserMewsong();
  }
}
