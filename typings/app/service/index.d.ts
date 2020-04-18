// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAlbum from '../../../app/service/album';
import ExportArtist from '../../../app/service/artist';
import ExportDj from '../../../app/service/dj';
import ExportLogin from '../../../app/service/login';
import ExportUser from '../../../app/service/user';
import ExportVideo from '../../../app/service/video';

declare module 'egg' {
  interface IService {
    album: AutoInstanceType<typeof ExportAlbum>;
    artist: AutoInstanceType<typeof ExportArtist>;
    dj: AutoInstanceType<typeof ExportDj>;
    login: AutoInstanceType<typeof ExportLogin>;
    user: AutoInstanceType<typeof ExportUser>;
    video: AutoInstanceType<typeof ExportVideo>;
  }
}
