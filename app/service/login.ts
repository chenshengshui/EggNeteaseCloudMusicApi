import { Service } from 'egg';
import createRequest from '../utils/createRequest';
const crypto = require('crypto');

/**
 * Login Service
 */
export default class Login extends Service {
  public async loginByCellPhone({
    phone,
    countrycode,
    password,
    rememberLogin,
  }) {
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
}
