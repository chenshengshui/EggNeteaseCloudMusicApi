export interface iPostPlaylistCreate {
  name: string;
  privacy: 1 | 10;
}

export interface iPid {
  pid: string;
}

export interface iUpdatePlaylistDes extends iPid {
  description: string;
}
