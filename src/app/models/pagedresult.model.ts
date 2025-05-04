export interface PagedResult<T> {
  items: T[]
  totalItems: number
  page: number
  limit: number
}
