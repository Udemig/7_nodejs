import { catchAsync } from "./utils/index.js";
import authService from "./auth.service.js";
import { validateDTO, registerSchema } from "./auth.dto.js";

class AuthController {
  register = catchAsync(async (req, res, next) => {
    // client'dan gelen verinin doğru formatta ve eksiksiz olduğundan emin ol
    const body = await validateDTO(registerSchema, req.body);

    // client'a cevap gönder
    res.status(201).json({
      status: "success",
      message: "Kullanıcı başarıyla oluşturuldu",
      body,
    });
  });

  login = catchAsync(async (req, res, next) => {});

  logout = catchAsync(async (req, res, next) => {});

  profile = catchAsync(async (req, res, next) => {});
}

export default new AuthController();
