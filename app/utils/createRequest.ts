const encrypt = require('./crypto');
const request = require('request');
const queryString = require('querystring');
const PacProxyAgent = require('pac-proxy-agent');
const zlib = require('zlib');
import { generateUserAgent } from './utils';

// request.debug = true // 开启可看到更详细信息

const createRequest = (method, url, data, options) => {
  return new Promise((resolve, reject) => {
    const headers: any = { 'User-Agent': generateUserAgent(options.ua) };
    if (method.toUpperCase() === 'POST') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    if (url.includes('music.163.com')) {
      headers.Referer = 'https://music.163.com';
    }
    // headers['X-Real-IP'] = '118.88.88.88'

    if (typeof options.cookie === 'object') {
      headers.Cookie = Object.keys(options.cookie)
        .map(
          (key: any) =>
            encodeURIComponent(key) +
            '=' +
            encodeURIComponent(options.cookie[key])
        )
        .join('; ');
    } else if (options.cookie) headers.Cookie = options.cookie;

    if (options.crypto === 'weapi') {
      const csrfToken = (headers.Cookie || '').match(/_csrf=([^(;|$)]+)/);
      data.csrf_token = csrfToken ? csrfToken[1] : '';
      data = encrypt.weapi(data);
      url = url.replace(/\w*api/, 'weapi');
    } else if (options.crypto === 'linuxapi') {
      data = encrypt.linuxapi({
        method,
        url: url.replace(/\w*api/, 'api'),
        params: data,
      });
      headers['User-Agent'] =
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36';
      url = 'https://music.163.com/api/linux/forward';
    } else if (options.crypto === 'eapi') {
      const cookie = options.cookie || {};
      const csrfToken = cookie.__csrf || '';
      const header: any = {
        osver: cookie.osver, // 系统版本
        deviceId: cookie.deviceId, // encrypt.base64.encode(imei + '\t02:00:00:00:00:00\t5106025eb79a5247\t70ffbaac7')
        appver: cookie.appver || '6.1.1', // app版本
        versioncode: cookie.versioncode || '140', // 版本号
        mobilename: cookie.mobilename, // 设备model
        buildver: cookie.buildver || Date.now().toString().substr(0, 10),
        resolution: cookie.resolution || '1920x1080', // 设备分辨率
        __csrf: csrfToken,
        os: cookie.os || 'android',
        channel: cookie.channel,
        requestId: `${Date.now()}_${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(4, '0')}`,
      };
      if (cookie.MUSIC_U) header.MUSIC_U = cookie.MUSIC_U;
      if (cookie.MUSIC_A) header.MUSIC_A = cookie.MUSIC_A;
      headers.Cookie = Object.keys(header)
        .map(
          (key: any) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(header[key])
        )
        .join('; ');
      data.header = header;
      data = encrypt.eapi(options.url, data);
      url = url.replace(/\w*api/, 'eapi');
    }

    const answer: any = { status: 500, body: {}, cookie: [] };
    const settings: any = {
      method,
      url,
      headers,
      body: queryString.stringify(data),
    };

    if (options.crypto === 'eapi') settings.encoding = null;

    if (/\.pac$/i.test(options.proxy)) {
      settings.agent = new PacProxyAgent(options.proxy);
    } else {
      settings.proxy = options.proxy;
    }

    request(settings, (err, res, body) => {
      if (err) {
        answer.status = 502;
        answer.body = { code: 502, msg: err.stack };
        reject(answer);
      } else {
        answer.cookie = (res.headers['set-cookie'] || []).map((x: string) =>
          x.replace(/\s*Domain=[^(;|$)]+;*/, '')
        );
        try {
          if (options.crypto === 'eapi') {
            zlib.unzip(body, function (err, buffer) {
              const _buffer = err ? body : buffer;
              try {
                try {
                  answer.body = JSON.parse(encrypt.decrypt(_buffer).toString());
                  answer.status = answer.body.code || res.statusCode;
                } catch (e) {
                  answer.body = JSON.parse(_buffer.toString());
                  answer.status = res.statusCode;
                }
              } catch (e) {
                answer.body = _buffer.toString();
                answer.status = res.statusCode;
              }
              answer.status =
                answer.status > 100 && answer.status < 600
                  ? answer.status
                  : 400;
              if (answer.status === 200) resolve(answer);
              else reject(answer);
            });
            return false;
          }
          answer.body = JSON.parse(body);
          answer.status = answer.body.code || res.statusCode;
          if (answer.body.code === 502) {
            answer.status = 200;
          }
        } catch (e) {
          answer.body = body;
          answer.status = res.statusCode;
        }

        answer.status =
          answer.status > 100 && answer.status < 600 ? answer.status : 400;
        if (answer.status === 200) resolve(answer);
        else reject(answer);
      }
    });
  });
};

export default createRequest;
