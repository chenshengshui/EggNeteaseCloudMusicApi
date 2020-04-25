import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // cookie 签名
  config.keys = appInfo.name + '_1585919666382_9400';

  // 中间件配置
  config.middleware = ['query', 'cookie', 'error'];

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

  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  return {
    ...config,
    ...bizConfig,
  };
};
