/**
 * header设置
 */
module.exports = () => {
  return async function (ctx, next) {
    const { response } = ctx;
    response.setHeader;
    await next();
  };
};
