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

  /**
   * @description 创建歌单
   */
  public async deletePlaylist() {
    const { ctx } = this;
    const { pid } = ctx.request.body;
    ctx.body = await ctx.service.playlist.deletePlaylist({
      pid,
    });
  }

  /**
   * @description 更新歌单描述
   */
  public async updatePlaylistDes() {
    const { ctx } = this;
    const { pid, description } = ctx.request.body;
    ctx.body = await ctx.service.playlist.updatePlaylistDes({
      pid,
      description,
    });
  }

  /**
   * @description 获取歌单详情
   */
  public async getPlaylistDetail() {
    const { ctx } = this;
    const { pid, subNum } = ctx.query;
    ctx.body = await ctx.service.playlist.getPlaylistDetail({
      pid,
      subNum,
    });
  }
}
