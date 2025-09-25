export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface ApiError {
  message: string;
  status?: number;
}