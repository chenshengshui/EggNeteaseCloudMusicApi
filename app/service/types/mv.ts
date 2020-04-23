export interface iPageParams {
  page?: number;
  pageSize?: number;
}

export interface iGetMvList {
  area?: string;
  type?: 0 | 1 | 2 | 3 | 4;
  order?: 0 | 1 | 2;
  page?: number;
  pageSize?: number;
}

export interface iMvId {
  mvId: string;
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
