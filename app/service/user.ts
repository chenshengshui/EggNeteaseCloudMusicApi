import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import { iDeleteCloudMusic, iGetCloudMusicsInfo, iPageParams } from './user.d';

/**
 * User Service
 */
export default class User extends Service {
  /**
   * @description 获取用户电台
   * @param userId
   */
  public async getAudios({ userId }) {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/get/byuser`,
      {
        userId: userId,
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
        page,
        pageSize,
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
  public async getUserInfo({ uid }): Promise<any> {
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
}
