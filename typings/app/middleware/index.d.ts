// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCookie from '../../../app/middleware/cookie';
import ExportHeader from '../../../app/middleware/header';
import ExportQuery from '../../../app/middleware/query';

declare module 'egg' {
  interface IMiddleware {
    cookie: typeof ExportCookie;
    header: typeof ExportHeader;
    query: typeof ExportQuery;
  }
}
