export interface iGetAlbumDynamicInfo {
  albumId: string;
}

export interface iPostAlbumSub {
  albumId: string;
  actionType: 'sub' | 'unsub';
}
