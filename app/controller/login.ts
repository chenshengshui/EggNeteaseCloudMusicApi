import { Controller } from 'egg';

export default class HomeController extends Controller {
  /**
   * 手机号登录
   */
  public async loginByCellPhone() {
    const { ctx } = this;
    const query = ctx.request.query;
    const { phone, password, rememberLogin = false } = ctx.request.body;

    try {
      const result: any = await ctx.service.login.loginByCellPhone({
        phone,
        countrycode: query.countrycode,
        password,
        rememberLogin,
      });
      ctx.body = result;
      const useId = result.body.account.id;
      const maxAge = rememberLogin ? 3600 * 24 * 30 : 3600 * 24;
      ctx.cookies.set('userId', useId, { httpOnly: true, maxAge: maxAge });
    } catch (err) {}
  }
}
