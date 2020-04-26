import { Service } from 'egg';

import createRequest from '../utils/createRequest';

import {
  iLoginByCellPhone,
  iPostInitProfile,
  iPostLoginCaptchaSend,
  iPostLoginCaptchaVerify,
  iPostCheckCellphoneExit,
} from './types/login';
const crypto = require('crypto');

/**
 * Login Service
 */
export default class Login extends Service {
  /**
   * @description 手机号码登录
   * @param phone
   * @param password
   * @param countrycode
   * @param rememberLogin
   */
  public async loginByCellPhone({
    phone,
    countrycode,
    password,
    rememberLogin,
  }: iLoginByCellPhone): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      'https://music.163.com/weapi/login/cellphone',
      {
        phone,
        countrycode,
        password: crypto.createHash('md5').update(password).digest('hex'),
        rememberLogin,
      },
      {
        crypto: 'weapi',
        ua: 'pc',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 初始化昵称
   * @param nickname
   */
  public async postInitProfile({ nickname }: iPostInitProfile): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `http://music.163.com/eapi/activate/initProfile`,
      { nickname },
      {
        crypto: 'eapi',
        cookie: query.cookie,
        proxy: query.proxy,
        url: '/api/activate/initProfile',
      }
    );
  }

  /**
   * @description 发送验证码
   * @param ctcode
   * @param cellphone
   */
  public async postLoginCaptchaSend({
    ctcode,
    cellphone,
  }: iPostLoginCaptchaSend): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/sms/captcha/sent`,
      { ctcode, cellphone },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 发送验证码
   * @param ctcode
   * @param cellphone
   * @param captcha
   */
  public async postLoginCaptchaVerify({
    ctcode,
    cellphone,
    captcha,
  }: iPostLoginCaptchaVerify): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/sms/captcha/verify`,
      { ctcode, cellphone, captcha },
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
      }
    );
  }

  /**
   * @description 发送验证码
   * @param ctcode
   * @param cellphone
   * @param captcha
   */
  public async postCheckCellphoneExit({
    cellphone,
    countrycode,
  }: iPostCheckCellphoneExit): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `http://music.163.com/eapi/cellphone/existence/check`,
      { cellphone, countrycode },
      {
        crypto: 'eapi',
        cookie: query.cookie,
        proxy: query.proxy,
        url: '/api/cellphone/existence/check',
      }
    );
  }

  /**
   * @description 刷新登录状态
   */
  public async getLoginRefresh(): Promise<any> {
    const { ctx } = this;
    const query = ctx.request.query;
    return createRequest(
      'POST',
      `https://music.163.com/weapi/login/token/refresh`,
      {},
      {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
        ua: 'pc',
      }
    );
  }
}
