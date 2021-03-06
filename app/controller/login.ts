import { Controller } from 'egg';

import { Default_Ctcode } from '../utils/common';

export default class LoginController extends Controller {
  /**
   * @description 手机号登录
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

  /**
   * @description 邮箱登录
   */
  public async loginByEmail() {
    const { ctx } = this;
    const { email, password, rememberLogin = false } = ctx.request.body;
    try {
      const result: any = await ctx.service.login.loginByEmail({
        email,
        password,
        rememberLogin,
      });
      ctx.body = result;
      const useId = result.body.account.id;
      const maxAge = rememberLogin ? 3600 * 24 * 30 : 3600 * 24;
      ctx.cookies.set('userId', useId, { httpOnly: true, maxAge: maxAge });
    } catch (err) {}
  }

  /**
   * @description 初始化昵称
   */
  public async postInitProfile() {
    const { ctx } = this;
    const { nickname } = ctx.request.body;
    ctx.body = await ctx.service.login.postInitProfile({ nickname });
  }

  /**
   * @description 发送验证码
   */
  public async postLoginCaptchaSend() {
    const { ctx } = this;
    const { ctcode = Default_Ctcode, cellphone } = ctx.request.body;
    ctx.body = await ctx.service.login.postLoginCaptchaSend({
      ctcode,
      cellphone,
    });
  }

  /**
   * @description 校验验证码
   */
  public async postLoginCaptchaVerify() {
    const { ctx } = this;
    const { ctcode = Default_Ctcode, cellphone, captcha } = ctx.request.body;
    ctx.body = await ctx.service.login.postLoginCaptchaVerify({
      ctcode,
      cellphone,
      captcha,
    });
  }

  /**
   * @description 校验手机号是否存在
   */
  public async postCheckCellphoneExit() {
    const { ctx } = this;
    const { cellphone, countrycode } = ctx.request.body;
    ctx.body = await ctx.service.login.postCheckCellphoneExit({
      cellphone,
      countrycode,
    });
  }

  /**
   * @description 登录状态刷新
   */
  public async getLoginRefresh() {
    const { ctx } = this;
    ctx.body = await ctx.service.login.getLoginRefresh();
  }

  /**
   * @description 获取登录状态码
   */
  public async getLoginStatus() {
    const { ctx } = this;
    try {
      const response: any = await ctx.service.login.getLoginStatus();
      const profile: any = /GUser\s*=\s*([^;]+);/.exec(response.body);
      const bindings: any = /GBinds\s*=\s*([^;]+);/.exec(response.body);
      ctx.body = {
        code: 200,
        profile: profile[1],
        bindings: bindings[1],
      };
    } catch (err) {
      ctx.status = 301;
      ctx.body = { code: 301 };
    }
  }

  /**
   * @description 登出
   */
  public async getLogout() {
    const { ctx } = this;
    ctx.body = await ctx.service.login.getLogout();
  }
}
