export interface iGetArtistList extends iPageParams {
  categoryCode: string;
  initial?: string | number;
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

export interface iPageParams {
  page?: number;
  pageSize?: number;
}
