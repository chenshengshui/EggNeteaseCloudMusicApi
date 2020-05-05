export interface iGetArtistList extends iPageParams {
  categoryCode: string;
  initial?: string | number;
}

export interface iGetArtistBrief {
  /** @params */
  artistId: string;
}

export interface iGetArtistInfo {
  /** @params */
  artistId: string;
}

export interface iGetArtistArts extends iPageParams {
  artistId: string;
}

export interface iPostArtistSub {
  artistId: string;
  actionType: 'sub' | 'unsub';
}

export interface iGetArtistTopSong {
  artistId: string;
}

export interface iPageParams {
  offset?: number;
  limit?: number;
}
