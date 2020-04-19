export interface iGetGroupVideos {
  groupId: string;
  page: number;
  resolution: number;
}
export interface iVideoId {
  videoId: string;
}

export interface iPostVideoSub extends iVideoId {
  actionType: 'sub' | 'unsub';
}

export interface iGetVideoUrls {
  videoIds: string;
  resolution: number;
}
