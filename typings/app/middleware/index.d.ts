// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCookie from '../../../app/middleware/cookie';
import ExportError from '../../../app/middleware/error';
import ExportQuery from '../../../app/middleware/query';

declare module 'egg' {
  interface IMiddleware {
    cookie: typeof ExportCookie;
    error: typeof ExportError;
    query: typeof ExportQuery;
  }
}
