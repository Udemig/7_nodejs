import z from "zod";

// address dto
export const addressSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  address: z.string().min(1, "Adres zorunludur"),
  city: z.string().min(1, "Şehir zorunludur"),
  district: z.string().min(1, "İlçe zorunludur"),
  postalCode: z.string().min(1, "Posta kodu zorunludur"),
  isDefault: z.boolean().default(false),
});

// orderitem dto
export const orderItemSchema = z.object({
  productId: z.string().min(1, "Ürün id'si zorunludur"),
  name: z.string().min(1, "Ürün adı zorunludur"),
  price: z.number().min(1, "Fiyat zorunludur"),
  quantity: z.number().min(1, "Adet zorunludur"),
});

// order dto
export const orderSchema = z.object({
  restaurantId: z.string().min(1, "Restoran id'si zorunludur"),
  items: z.array(orderItemSchema).min(1, "En az 1 ürün seçiniz"),
  deliveryAddress: addressSchema,
  paymentMethod: z.enum(["credit_card", "cash", "mobile_payment"]),
  specialInstructions: z.string().optional(),
});

//
export type AddressInput = z.infer<typeof addressSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type OrderInput = z.infer<typeof orderSchema>;

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
