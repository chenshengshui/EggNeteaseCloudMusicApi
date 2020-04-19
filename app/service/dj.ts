import { Service } from 'egg';
import createRequest from '../utils/createRequest';
import { iDjId, iPageParams, iDjHoursProgram, iGetDjProgramList } from './dj.d';

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
}
