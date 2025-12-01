import type { LoginValues, RegisterValues, Response, User } from "../types";
import api from "./axios";

const authService = {
  login: async (data: LoginValues) => {
    const res = await api.post<Response<User>>("/auth/login", data);

    return res.data;
  },

  register: async (data: RegisterValues) => {
    const res = await api.post<Response<User>>("/auth/register", data);

    return res.data;
  },

  getProfile: async () => {
    const res = await api.get<Response<User>>("/auth/profile");

    return res.data;
  },

  logout: async () => {
    const res = await api.post("/auth/logout");

    return res.data;
  },

  refreshToken: async () => {
    const res = await api.post("/auth/refresh-token");

    return res.data;
  },
};

export default authService;
