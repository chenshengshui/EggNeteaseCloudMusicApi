/**
 * 错误处理中间件
 */
module.exports = () => {
  return async function (ctx, next) {
    try {
      await next();
    } catch (error) {
      ctx.body = error.body;
      ctx.status = error.status;
    }
  };
};
