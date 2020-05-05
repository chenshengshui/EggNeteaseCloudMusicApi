export interface iPageParams {
  offset?: number;
  limit?: number;
}

export interface iGetMvList {
  area?: 0 | 1 | 2 | 3 | 4 | 5;
  type?: 0 | 1 | 2 | 3 | 4;
  order?: 0 | 1 | 2;
  offset?: number;
  limit?: number;
}

export interface iMvId {
  mvId: string;
}

export interface iGetLatestMv {
  limit: number;
  area: 0 | 1 | 2 | 3 | 4 | 5;
}

export enum MvArea {
  '全部',
  '内地',
  '港台',
  '欧美',
  '日本',
  '韩国',
}

export enum MvType {
  '全部',
  '官方版',
  '原生',
  '现场版',
  '网易出品',
}

export enum MvOrder {
  '上升最快',
  '最热',
  '最新',
}

export interface iPostMvSub extends iMvId {
  actionType: 'sub' | 'unsub';
}

export interface iGetMvUrl extends iMvId {
  resolution: number;
}
