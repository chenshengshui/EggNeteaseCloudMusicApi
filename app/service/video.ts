import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import { iVideoId, iGetGroupVideos } from './video.d';

/**
 * Video Service
 */
export default class Video extends Service {
  /**
   * @description 获取视频信息
   * @param videoId
   */
  public async getVideoInfo({ videoId }: iVideoId): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      'https://music.163.com/weapi/cloudvideo/v1/video/detail',
      {
        videoId,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取视频信息
   */
  public async getVideoGroupList(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      'https://music.163.com/api/cloudvideo/group/list',
      {},
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 获取视频分组下视频
   * @param groupId
   * @param pageSize
   * @param resolution
   */
  public async getVideoGroupVideos({
    groupId,
    page,
    resolution,
  }: iGetGroupVideos): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      'https://music.163.com/weapi/videotimeline/videogroup/get',
      {
        groupId,
        offset: page,
        resolution,
        needUrl: true,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }
}
