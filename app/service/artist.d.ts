export interface iGetArtistList extends iPageParams {
  categoryCode: string;
  initial?: string | number;
}

export interface iGetArtistInfo {
  /** @params */
  artistId: string;
}

export interface iGetArtistAlbums extends iPageParams {
  artistId: string;
}

export interface iPageParams {
  page?: number;
  pageSize?: number;
}
