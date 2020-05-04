import { Service } from 'egg';

import createRequest from '../utils/createRequest';

import {
  iDeleteCloudMusic,
  iGetCloudMusicsInfo,
  iPageParams,
  iUserId,
  iGetUserEvent,
  iGetUserFollows,
  iGetUserPlayRecord,
  iUserInfo,
} from './types/user';

/**
 * User Service
 */
export default class User extends Service {
  /**
   * @description 获取用户电台
   * @param uid
   */
  public async getAudios({ uid }: iUserId) {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/get/byuser`,
      {
        userId: uid,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 删除用户云盘歌曲
   * @param ids
   */
  public async deleteCloudMusic({ ids }: iDeleteCloudMusic): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `http://music.163.com/weapi/cloud/del`,
      {
        songIds: ids,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取用户云盘歌曲详情
   * @param ids
   */
  public async getCloudMusicsInfo({ ids }: iGetCloudMusicsInfo): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/v1/cloud/get/byids`,
      {
        songIds: ids,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取云盘音乐列表
   * @param param0
   */
  public async getCloudMusics({ page, pageSize }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/v1/cloud/get`,
      {
        offset: page,
        limit: pageSize,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取用户信息
   * @param uid
   */
  public async getUserInfo({ uid }: iUserId): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/v1/user/detail/${uid}`,
      {},
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取用户电台
   * @param uid
   */
  public async getUserDjs({ uid }: iUserId): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/dj/program/${uid}`,
      {},
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取用户动态
   * @param uid
   * @param lasttime 时间戳，获取下一页数据，传入返回的lasttime
   * @param pageSize 分页大小
   */
  public async getUserEvent({
    uid,
    lasttime,
    pageSize,
  }: iGetUserEvent): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/dj/program/${uid}`,
      {
        getcounts: true,
        time: lasttime,
        limit: pageSize,
        total: false,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取用户粉丝
   * @param uid
   * @param lasttime 时间戳，获取下一页数据，传入返回的lasttime
   * @param pageSize 分页大小
   */
  public async getUserFolloweds({
    uid,
    lasttime,
    pageSize,
  }: iGetUserEvent): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/eapi/user/getfolloweds/${uid}`,
      {
        userId: uid,
        time: lasttime,
        limit: pageSize,
      },
      {
        crypto: 'eapi',
        cookie: query.cookie,
        proxy: query.proxy,
        url: '/api/user/getfolloweds',
      }
    );
  }

  /**
   * @description 获取用户关注者
   * @param uid
   * @param lasttime 时间戳，获取下一页数据，传入返回的lasttime
   * @param pageSize 分页大小
   */
  public async getUserFollows({
    uid,
    page,
    pageSize,
  }: iGetUserFollows): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/user/getfollows/${uid}`,
      {
        offset: page,
        limit: pageSize,
        order: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取用户播放列表
   * @param uid
   * @param page
   * @param pageSize
   */
  public async getUserPlaylist({
    uid,
    page,
    pageSize,
  }: iGetUserFollows): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/user/playlist`,
      {
        offset: page,
        limit: pageSize,
        uid: uid,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @interface 获取用户播放记录
   * @param uid
   * @param type 1 | 0
   * type=1 时只返回 weekData, type=0 时返回 allData
   */
  public async getUserPlayrecord({
    uid,
    type,
  }: iGetUserPlayRecord): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/v1/play/record`,
      {
        type,
        uid,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @interface 获取用户收藏计数
   */
  public async getUserSubcount(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/subcount`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 更新用户信息
   * @param birthday
   * @param city
   * @param gender
   * @param nickname
   * @param province
   * @param signature
   */
  public async putUserInfo({
    birthday,
    city,
    gender,
    nickname,
    province,
    signature,
  }: iUserInfo): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/user/profile/update`,
      {
        avatarImgId: '0',
        birthday,
        city,
        gender,
        nickname,
        province,
        signature,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取用户操作记录
   */
  public async getUserLogs() {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/feedback/weblog`,
      {},
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 个人FM
   */
  public async getUserFM() {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/v1/radio/get`,
      {},
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }
}
