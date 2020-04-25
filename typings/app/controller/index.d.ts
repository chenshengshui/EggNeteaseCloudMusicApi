// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAlbum from '../../../app/controller/album';
import ExportArtist from '../../../app/controller/artist';
import ExportComment from '../../../app/controller/comment';
import ExportDj from '../../../app/controller/dj';
import ExportLogin from '../../../app/controller/login';
import ExportMv from '../../../app/controller/mv';
import ExportPlaylist from '../../../app/controller/playlist';
import ExportUser from '../../../app/controller/user';
import ExportVideo from '../../../app/controller/video';

declare module 'egg' {
  interface IController {
    album: ExportAlbum;
    artist: ExportArtist;
    comment: ExportComment;
    dj: ExportDj;
    login: ExportLogin;
    mv: ExportMv;
    playlist: ExportPlaylist;
    user: ExportUser;
    video: ExportVideo;
  }
}
