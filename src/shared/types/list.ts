export interface ListResponse<T> {
  content: T[];
  page: number;
  size: number;
  total: number;
  pageCount: number;
}
