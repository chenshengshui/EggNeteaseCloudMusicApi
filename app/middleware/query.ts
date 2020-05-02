/**
 * 处理query数据
 */
module.exports = () => {
  return async function (ctx, next) {
    const { request } = ctx;
    const cookies = {};
    (request.headers.cookie || '').split(/\s*;\s*/).forEach((pair) => {
      let crack = pair.indexOf('=');
      if (crack < 1 || crack == pair.length - 1) return;
      cookies[
        decodeURIComponent(pair.slice(0, crack)).trim()
      ] = decodeURIComponent(pair.slice(crack + 1)).trim();
    });

    request.query = Object.assign({}, request.query, request.body);
    request.query.cookie = cookies;

    await next();
  };
};
