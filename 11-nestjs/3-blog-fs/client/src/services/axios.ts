import axios from "axios";
import authService from "./auth-service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// eğer access token'ın süresinin dolmasından kaynaklı api'dan bir hata gelirse tokenı yenile
// bunun için axios interceptor ile api'dan gelen yanıtları dinlememiz lazım
// eğer gelen yanıt TOKEN_EXPIRED ise tokenı yenile ve hata alan isteği tekrar at
api.interceptors.response.use(
  (res) => res,

  async (err) => {
    // atılan api isteğini al
    const originalRequest = err.config;

    // eğer hatanın sebebi TOKEN_EXPIRED ise:
    if (
      originalRequest &&
      !originalRequest.retry &&
      err.response.data.code === "TOKEN_EXPIRED"
    ) {
      // isteği tekrar atıcağımız için retry'ı true yap
      originalRequest.retry = true;

      try {
        // refresh token'ı kullanarak yeni bir access token al
        await authService.refreshToken();

        // hata alan isteği tekrar at
        return api.request(originalRequest);
      } catch (err) {
        // eğer refresh token'ın süresi dolduysa kullanıcıyı logout et
        await authService.logout();

        // login sayfasına yönlendir
        window.location.href = "/login";
      }
    }

    // farklı bir hata ise hatayı tekrar fırlat
    return Promise.reject(err);
  }
);

export default api;
