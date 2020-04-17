/**
 * 处理cookie
 */
module.exports = () => {
  return async function (ctx, next) {
    const { response } = ctx;
    await next();
    response.append('Set-Cookie', response.body.cookie);
  };
};
