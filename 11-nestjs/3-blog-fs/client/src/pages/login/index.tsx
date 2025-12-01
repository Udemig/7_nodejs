import type { FC } from "react";
import { Form, Formik } from "formik";
import { loginInitialValues } from "../../constants";
import Input from "../../components/input";
import { loginSchema } from "../../constants/schemas";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import type { LoginValues } from "../../types";

const Login: FC = () => {
  const { login } = useAuth();

  const handleSubmit = (values: LoginValues) => {
    login(values);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
      {/* Arkaplan Efekti */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Logo ve Başlık */}
        <div className="text-center mb-8">
          <div className="size-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-yellow-55 to-yellow-60 flex items-center justify-center shadow-lg shadow-yellow-55/30">
            <span className="text-2xl">👋</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Hesabına Giriş Yap</h2>
          <p className="text-grey-50 mt-2">Tekrar hoşgeldin!</p>
        </div>

        {/* Form */}
        <div className="glass-card p-6 md:p-8">
          <Formik
            initialValues={loginInitialValues}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
          >
            <Form className="space-y-8">
              <Input label="Kullanıcı Adı" name="username" type="text" />
              <Input label="Şifre" name="password" type="text" />

              <div className="pt-2">
                <button type="submit" className="submit-button">
                  Giriş Yap
                </button>
              </div>
            </Form>
          </Formik>

          <p className="mt-6 text-center text-sm/6 text-grey-50">
            Hesabın yok mu?{" "}
            <Link
              to="/register"
              className="font-semibold text-yellow-55 hover:text-yellow-60 ps-2 transition-colors"
            >
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
