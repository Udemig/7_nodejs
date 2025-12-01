import * as yup from "yup";

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
    .max(20, "Kullanıcı adı en fazla 20 karakter olmalıdır")
    .required("Kullanıcı adı zorunludur"),
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email zorunludur"),
  password: yup
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .matches(passwordRegex, "Şifre yeterince güçlü değil")
    .required("Şifre zorunludur"),
});

export const loginSchema = yup.object().shape({
  username: yup.string().required("Kullanıcı adı zorunludur"),

  password: yup.string().required("Şifre zorunludur"),
});
