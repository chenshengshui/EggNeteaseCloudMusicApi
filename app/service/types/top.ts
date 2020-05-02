export interface iPageParams {
  page?: number;
  pageSize?: number;
}

export interface iGetTopAlbum extends iPageParams {
  area?: AlbumArea;
}

export enum AlbumArea {
  ALL = 'ALL',
  ZH = 'ZH',
  EA = 'EA',
  KR = 'KR',
  JP = 'JP',
}
