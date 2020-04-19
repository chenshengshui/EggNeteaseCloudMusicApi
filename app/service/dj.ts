import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import {
  iDjId,
  iPageParams,
  iDjHoursProgram,
  iGetDjProgramList,
  iGetCatgoryHotDjs,
  iGetTypeRecDjs,
  iPostDjSub,
} from './dj.d';

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
   * @param page
   * @param pageSize
   */
  public async getHotDjs({ page, pageSize }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/hot/v1`,
      { offset: page, limit: pageSize },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取付费电台列表
   * @param page
   * @param pageSize
   */
  public async getPaygiftDjs({ page, pageSize }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/home/paygift/list?_nmclfl=1`,
      { offset: page, limit: pageSize },
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
    pageSize,
  }: iDjHoursProgram): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/djprogram/toplist/hours`,
      { limit: pageSize },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取电台节目榜
   */
  public async getDjToplistProgram({
    page,
    pageSize,
  }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/program/toplist/v1`,
      { offset: page, limit: pageSize },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取电台节目列表
   */
  public async getDjProgramList({
    page,
    pageSize,
    djId,
    asc,
  }: iGetDjProgramList): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/dj/program/byradio`,
      { djId, asc, offset: page, limit: pageSize },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }

  /**
   * @description 获取分类热门电台
   */
  public async getCatgoryHotDjs({
    page,
    pageSize,
    catgoryId,
  }: iGetCatgoryHotDjs): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/api/djradio/hot`,
      { cateId: catgoryId, offset: page, limit: pageSize },
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
   * @description 订阅｜ 取消订阅电台
   * @param djId
   * @param actionType
   */
  public async getDjSublist({ page, pageSize }: iPageParams): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;

    return createRequest(
      'POST',
      `https://music.163.com/weapi/djradio/get/subed`,
      {
        offset: page,
        limit: pageSize,
        total: true,
      },
      { crypto: 'weapi', cookie: query.cookie, proxy: query.proxy }
    );
  }
}
