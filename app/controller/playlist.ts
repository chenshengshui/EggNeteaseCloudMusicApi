import { Controller } from 'egg';
// import { Default_PageNumber, Default_PageSize } from '../utils/common';

export default class ArtistController extends Controller {
  /**
   * @description 获取歌单 分类列表
   */
  public async getPlaylistCatgorys() {
    const { ctx } = this;
    ctx.body = await ctx.service.playlist.getPlaylistCatgorys();
  }

  /**
   * @description 创建歌单
   */
  public async postPlaylistCreate() {
    const { ctx } = this;
    const { name, privacy } = ctx.request.body;
    ctx.body = await ctx.service.playlist.postPlaylistCreate({
      name,
      privacy,
    });
  }
}
