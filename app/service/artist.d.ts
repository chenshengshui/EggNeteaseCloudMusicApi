export interface iGetArtistList {
  categoryCode: string;
  page?: number;
  pageSize?: number;
  initial?: string | number;
}

export interface iGetArtistInfo {
  /** @params */
  artistId: string;
}

export interface iGetArtistAlbums {
  artistId: string;
  page?: number;
  pageSize?: number;
}
