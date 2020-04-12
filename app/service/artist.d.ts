export interface iGetArtistList {
  categoryCode: string;
  page?: number;
  pageSize?: number;
  initial?: string | number;
}

export interface iGetArtistInfo {
  artistId: string;
}
