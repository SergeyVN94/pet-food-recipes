export type SearchPaginationDto = {
  page: number;
  limit: number;
};

export type SearchDto = {
  q?: string;
  pagination?: SearchPaginationDto;
};

export type SearchResponseWithPagination<T> = {
  items: T[];
  pagination: SearchPaginationDto;
};
