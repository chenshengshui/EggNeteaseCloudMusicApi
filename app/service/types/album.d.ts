export interface iGetAlbumDynamicInfo {
  albumId: string;
}

export interface iPostAlbumSub {
  albumId: string;
  actionType: 'sub' | 'unsub';
}

export interface iGetAlbumInfo {
  albumId: string;
}

export interface iPageParams {
  offset?: number;
  limit?: number;
}
