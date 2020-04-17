/**
 * 处理query数据
 */
module.exports = () => {
  return async function (ctx, next) {
    const { request } = ctx;
    ctx.request.query = Object.assign({}, request.query, request.body, {
      cookie: request.headers.cookie,
    });
    await next();
  };
};
