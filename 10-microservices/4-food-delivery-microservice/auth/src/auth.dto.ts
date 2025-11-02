import { z } from "zod";

// şifre için regex
const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

// Zod schema
// Bu şema sayesinde client tarafından gelene body kısmındaki verinin formatını ve verilerinin validasyonunu yapabiliriz.
export const registerSchema = z.object({
  email: z.email("Geçerli bir email adresi giriniz"),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .regex(regex, "Şifreniz yeterince güçlü değil"),
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  phone: z.string().min(1, "Telefon numarası zorunludur"),
  role: z.enum(["customer", "restaurant_owner", "courier", "admin"]),
});

export const loginSchema = z.object({
  email: z.email("Geçerli bir email adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

// Şemalar üzerinden tip çıkartabiliyoruz
export type RegisterInput = z.infer<typeof registerSchema>;

// Bir şema ve veri alıp verinin şemaya uygun olup olmadığını kontrol eden fonksiyon
export async function validateDTO<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(z.prettifyError(error));
    }

    throw error;
  }
}
