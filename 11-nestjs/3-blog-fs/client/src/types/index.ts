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

interface Response<T> {
  message: string;
  data: T;
}

export type { RegisterValues, LoginValues, User, Response };
