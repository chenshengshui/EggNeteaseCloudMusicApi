// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportQuery from '../../../app/middleware/query';

declare module 'egg' {
  interface IMiddleware {
    query: typeof ExportQuery;
  }
}
