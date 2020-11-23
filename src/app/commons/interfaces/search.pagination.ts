export interface SearchPagination<T> {
  seek: T;
  page: number;
  records: number;
  order?: string;
  direction?: string;
}
