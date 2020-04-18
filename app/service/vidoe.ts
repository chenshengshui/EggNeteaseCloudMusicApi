import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import { iVideoId } from './video.d';

/**
 * Video Service
 */
export default class Video extends Service {
  /**
   * @description 获取视频信息
   * @param param0
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
}
