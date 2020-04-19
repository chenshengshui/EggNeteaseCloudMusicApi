export interface iPageParams {
  page?: number;
  pageSize?: number;
}

export interface iDjId {
  djId: string;
}

export interface iDjHoursProgram {
  pageSize?: number;
}

export interface iGetDjProgramList extends iPageParams {
  djId: string;
  asc: boolean;
}
