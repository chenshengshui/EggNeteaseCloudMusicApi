import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // cookie 签名
  config.keys = appInfo.name + '_1585919666382_9400';

  // 中间件配置
  config.middleware = ['query', 'cookie'];

  // 跨域配置
  config.cors = {
    allowHeaders: 'X-Requested-With,Content-Type',
    credentials: true,
    origin: '*',
    allowMethods: 'GET, HEAD, PUT, DELETE, PATCH, OPTIONS',
  };

  // 安全配置
  config.security = {
    csrf: {
      enable: false,
      headerName: 'x-csrf-token',
      ignore: 'localhost',
    },
  };

  // 错误处理
  config.onerror = {
    all(err, ctx) {
      if (err) {
        ctx.body = (ctx && ctx.response && ctx.response.message) || 'error';
        ctx.status = (ctx && ctx.response && ctx.response.status) || 500;
      }
    },
  };

  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  return {
    ...config,
    ...bizConfig,
  };
};
