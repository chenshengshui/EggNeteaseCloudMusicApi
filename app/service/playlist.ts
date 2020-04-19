import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import {
  iPostPlaylistCreate,
  iPid,
  iUpdatePlaylistDes,
  iGetPlaylistDetail,
} from './types/playlist';

/**
 * playlist Service
 */
export default class Playlist extends Service {
  /**
   * @description 获取歌单 分类列表
   */
  public async getPlaylistCatgorys(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/catalogue`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 创建歌单
   * @param name
   * @param privacy
   * 0 为普通歌单，10 为隐私歌单
   */
  public async postPlaylistCreate({
    name,
    privacy,
  }: iPostPlaylistCreate): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/create`,
      {
        name,
        privacy,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 删除歌单
   * @param pid
   */
  public async deletePlaylist({ pid }: iPid): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;
    query.cookie.os = 'pc';

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/delete`,
      {
        pid,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 更新歌单描述
   * @param pid
   * @param description
   */
  public async updatePlaylistDes({
    pid,
    description,
  }: iUpdatePlaylistDes): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;
    query.cookie.os = 'pc';

    return createRequest(
      'POST',
      `http://interface3.music.163.com/eapi/playlist/desc/update`,
      {
        id: pid,
        desc: description,
      },
      {
        crypto: 'eapi',
        cookie: query.cookie,
        proxy: query.proxy,
        url: '/api/playlist/desc/update',
      }
    );
  }

  /**
   * @description 获取歌单详情
   * @param pid
   * @param subNum
   */
  public async getPlaylistDetail({
    pid,
    subNum,
  }: iGetPlaylistDetail): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/v3/playlist/detail`,
      {
        id: pid,
        n: 100000,
        s: subNum,
      },
      {
        crypto: 'linuxapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }
}
