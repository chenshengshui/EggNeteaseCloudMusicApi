export interface iGetResourceComments extends iPageParams {
  resourceId: string;
  type: 'album' | 'dj' | 'music' | 'mv' | 'playlist' | 'video' | 'event';
  beforeTime: number;
}

export interface iPostResourceCommentLike {
  resourceId: string;
  commentId: string;
  type: 'album' | 'dj' | 'music' | 'mv' | 'playlist' | 'video' | 'event';
  actionType: 'like' | 'unlike';
}

export enum Comment_Resource_Type {
  album = 'R_AL_3_',
  dj = 'A_DJ_1_',
  music = 'R_SO_4_',
  mv = 'R_MV_5_',
  playlist = 'A_PL_0_',
  video = 'R_VI_62_',
  event = 'A_EV_2_',
}

export interface iPageParams {
  page?: number;
  pageSize?: number;
}
