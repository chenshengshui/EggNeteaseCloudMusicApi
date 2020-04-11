import { Controller } from 'egg';

export default class HomeController extends Controller {
  /**
   * 手机号登录
   */
  public async loginByCellPhone() {
    const { ctx } = this;
    const query = ctx.request.query;
    const { phone, password, rememberLogin } = ctx.request.body;

    ctx.body = await ctx.service.login.loginByCellPhone({
      phone,
      countrycode: query.countrycode,
      password,
      rememberLogin,
    });
  }
}
