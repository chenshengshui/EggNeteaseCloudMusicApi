import { Service } from 'egg';

import createRequest from '../utils/createRequest';

import {
  iPostPlaylistCreate,
  iPid,
  iUpdatePlaylistDes,
  iGetPlaylistDetail,
  iUpdatePlaylistName,
  iPostPlaylistSub,
  iGetPlaylistSubcribers,
  iUpdatePlaylistTags,
  iAddPlaylistSongs,
  iUpdatePlaylist,
} from './types/playlist';

/**
 * playlist Service
 */
export default class Playlist extends Service {
  /**
   * @description 获取歌单 分类列表
   */
  public async getPlaylistCategorys(): Promise<any> {
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

  /**
   * @description 获取热门歌单
   */
  public async getHotPlaylist(): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/hottags`,
      {},
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 更新歌单名
   * @param pid
   * @param name
   */
  public async updatePlaylistName({
    pid,
    name,
  }: iUpdatePlaylistName): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;

    return createRequest(
      'POST',
      `http://interface3.music.163.com/eapi/playlist/update/name`,
      {
        id: pid,
        name,
      },
      {
        crypto: 'eapi',
        cookie: query.cookie,
        proxy: query.proxy,
        url: '/api/playlist/update/name',
      }
    );
  }

  /**
   * @description 更新歌单名
   * @param pid
   * @param actionType
   */
  public async postPlaylistSub({
    pid,
    actionType,
  }: iPostPlaylistSub): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/${actionType}`,
      {
        id: pid,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 更新歌单名
   * @param pid
   * @param offset
   * @param limit
   */
  public async getPlaylistSubcribers({
    pid,
    offset,
    limit,
  }: iGetPlaylistSubcribers): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/subscribers`,
      {
        id: pid,
        limit: limit,
        offset: offset,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 更新歌单标签
   * @param pid
   * @param tags 多个tag用;分隔
   */
  public async updatePlaylistTags({
    pid,
    tags,
  }: iUpdatePlaylistTags): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;

    return createRequest(
      'POST',
      `http://interface3.music.163.com/eapi/playlist/tags/update`,
      {
        id: pid,
        tags,
      },
      {
        crypto: 'eapi',
        cookie: query.cookie,
        proxy: query.proxy,
        url: '/api/playlist/tags/update',
      }
    );
  }

  /**
   * @description 添加歌曲到歌单
   * @param pid
   * @param songIds
   */
  public async addPlaylistSongs({
    pid,
    songIds,
  }: iAddPlaylistSongs): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/manipulate/tracks`,
      {
        op: 'add',
        pid,
        trackIds: songIds,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 删除歌单歌曲
   * @param pid
   * @param songIds
   */
  public async deletePlaylistSongs({
    pid,
    songIds,
  }: iAddPlaylistSongs): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/manipulate/tracks`,
      {
        op: 'del',
        pid,
        trackIds: songIds,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 更新歌单
   * @param pid
   * @param tags
   * @param description
   */
  public async updatePlaylist({
    pid,
    tags,
    description,
  }: iUpdatePlaylist): Promise<any> {
    const { ctx } = this;
    const query: any = ctx.request.query;
    query.cookie.os = 'pc';
    query.desc = description;
    query.tags = tags;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/playlist/manipulate/tracks`,
      {
        '/api/playlist/desc/update': `{"id":${pid},"desc":"${description}"}`,
        '/api/playlist/tags/update': `{"id":${pid},"tags":"${query.tags}"}`,
        '/api/playlist/update/name': `{"id":${pid},"name":"${query.name}"}`,
      },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }
}
