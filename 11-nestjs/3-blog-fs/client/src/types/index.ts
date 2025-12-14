interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

interface LoginValues {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// ------------ Response Type -------------------

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

interface Response<T> {
  message: string;
  data: T;
}

interface PaginatedResponse<T> extends Response<T> {
  pagination: Pagination;
}

// ------------ Blogs --------------

interface BasicAuthor {
  username: string;
  email: string;
  id: string;
}

interface DetailedAuthor extends BasicAuthor {
  createdAt: string;
  updatedAt: string;
}

interface Blog<T = BasicAuthor> {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author: T;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
}

interface BlogFormValues {
  title: string;
  content: string;
  tags: string[];
}

interface GetAllParams {
  limit?: number;
  page?: number;
  userId?: string;
}

// Comment
interface Comment {
  content: string;
  user: BasicAuthor;
  blog: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export type {
  RegisterValues,
  LoginValues,
  User,
  Response,
  PaginatedResponse,
  Blog,
  GetAllParams,
  BasicAuthor,
  DetailedAuthor,
  Comment,
  BlogFormValues,
};
