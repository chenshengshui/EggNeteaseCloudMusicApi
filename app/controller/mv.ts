import { Controller } from 'egg';

import {
  Default_PageNumber,
  Default_PageSize,
  Defult_MvType,
  Default_MvOrder,
} from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 获取mv列表
   */
  public async getMvList() {
    const { ctx } = this;
    const {
      area = '全部',
      type = Defult_MvType,
      order = Default_MvOrder,
      page = Default_PageNumber,
      pageSize = Default_PageSize,
    } = ctx.query;

    ctx.body = await ctx.service.mv.getMvList({
      area,
      type,
      order,
      page,
      pageSize,
    });
  }
}
