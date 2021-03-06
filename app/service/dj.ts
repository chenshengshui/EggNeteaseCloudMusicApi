import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import {
  iDjId,
  iPageParams,
  iDjHoursProgram,
  iGetDjProgramList,
  iGetCategoryHotDjs,
  iGetTypeRecDjs,
  iPostDjSub,
  iGetDjToplist,
} from './types/dj';

/**
 * dj Service
 */
export default class Dj extends Service {
  /**
   * @description 获取电台 banner
   */
  public async getDjBanner(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `http://music.163.com/weapi/djradio/banner/get`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取非热门电台分类
   */
  public async getNonHotCategory(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `http://music.163.com/weapi/djradio/category/excludehot`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取推荐电台分类
   */
  public async getRecCategory(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `http://music.163.com/weapi/djradio/home/category/recommend`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取电台分类列表
   */
  public async getCategoryList(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/category/get`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取电台分类列表
   */
  public async getDjDetail({ djId }: iDjId): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/get`,
      { id: djId },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取热门电台列表
   * @param offset
   * @param limit
   */
  public async getHotDjs({ offset, limit }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/hot/v1`,
      { offset: offset, limit: limit },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取付费电台列表
   * @param offset
   * @param limit
   */
  public async getPaygiftDjs({ offset, limit }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/home/paygift/list?_nmclfl=1`,
      { offset: offset, limit: limit },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取电台分类列表
   */
  public async getDjProgramDetail({ djId }: iDjId): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/dj/program/detail`,
      { id: djId },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取电台节目24小时榜单
   */
  public async getDjToplistHoursProgram({
    limit,
  }: iDjHoursProgram): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/djprogram/toplist/hours`,
      { limit: limit },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取电台节目榜
   */
  public async getDjToplistProgram({
    offset,
    limit,
  }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/program/toplist/v1`,
      { offset: offset, limit: limit },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取电台节目列表
   */
  public async getDjProgramList({
    offset,
    limit,
    djId,
    asc,
  }: iGetDjProgramList): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/dj/program/byradio`,
      { djId, asc, offset: offset, limit: limit },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取分类热门电台
   */
  public async getCategoryHotDjs({
    offset,
    limit,
    categoryId,
  }: iGetCategoryHotDjs): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/djradio/hot`,
      { cateId: categoryId, offset: offset, limit: limit },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取类型推荐电台
   * @param typeId
   * 有声书 10001
   * 知识技能 453050
   * 商业财经 453051
   * 人文历史 11
   * 外语世界 13
   * 亲子宝贝 14
   * 创作|翻唱 2001
   * 音乐故事 2
   * 3D|电子 10002
   * 相声曲艺 8
   * 情感调频 3
   * 美文读物 6
   * 脱口秀 5
   * 广播剧 7
   * 二次元 3001
   * 明星做主播 1
   * 娱乐|影视 4
   * 科技科学 453052
   * 校园|教育 4001
   * 旅途|城市 12
   */

  public async getTypeRecDjs({ typeId }: iGetTypeRecDjs): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/recommend`,
      { cateId: typeId },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取推荐电台
   */
  public async getRecDjs(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/recommend/v1`,
      {},
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 订阅｜ 取消订阅电台
   * @param djId
   * @param actionType
   */
  public async postDjSub({ djId, actionType }: iPostDjSub): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/${actionType}`,
      {
        id: djId,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取订阅电台列表
   * @param offset
   * @param limit
   */
  public async getDjSublist({ offset, limit }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/get/subed`,
      {
        offset: offset,
        limit: limit,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取今日优选
   * @param offset
   */
  public async getTodayPerferedDjs({ offset }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `http://music.163.com/weapi/djradio/home/today/perfered`,
      {
        offset: offset,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取24小时榜电台
   * @param limit
   */
  public async getDjHoursToplist({ limit }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/dj/toplist/hours`,
      {
        limit: limit,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 电台新人榜
   */
  public async getDjNewcomerToplist({
    offset,
    limit,
  }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/dj/toplist/newcomer`,
      {
        offset: offset,
        limit: limit,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 付费精品
   */
  public async getDjPayToplist({ limit }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/djradio/toplist/pay`,
      {
        limit: limit,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 付费精品
   */
  public async getDjPopularToplist({ limit }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/dj/toplist/popular`,
      {
        limit: limit,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 热榜
   */
  public async getDjToplist({
    offset,
    limit,
    type,
  }: iGetDjToplist): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/djradio/toplist`,
      {
        offset: offset,
        limit: limit,
        type,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
