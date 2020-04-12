export interface iGetAlbumDynamicInfo {
  albumId: string;
}

export interface iPostAlbumSub {
  albumId: string;
  actionType: 'sub' | 'unsub';
}

export interface iPageParams {
  page?: number;
  pageSize?: number;
}
