import delay from "../../../../utils/delay";
import { fetchRecipe, fetchRecipes } from "../../../../utils/api";
import Image from "next/image";

// SSG
// Bu fonksiyondan return ettiğimiz parametreler için statik sayfalar oluşucak
export const generateStaticParams = async () => {
  // api'dan tarif veriisini al
  const data = await fetchRecipes();

  // hangi ürünler için detay sayfasını önceden statik olarak hazırlaycağımızı söyledik
  return data.recipes.map((i) => ({ id: String(i.id) }));
};

// Url'deki parametreleri prop olarak almak server component'lara özel bir yetenektir
// Eğer client component'da parametreler erişmek istiyorsak useParams/useSearchParams hooklarını kullanırız
const Detail = async ({ params }) => {
  await delay(3000);

  const { id } = await params;

  const recipe = await fetchRecipe(id);

  return (
    <div className="flex flex-col items-center gap-10 mt-20">
      <Image src={recipe.image} alt={recipe.name} width={250} height={250} />

      <h1>{recipe.name}</h1>
      <h1>Mutfak: {recipe.cuisine}</h1>
      <h1>Rating: {recipe.rating}</h1>
      <h1>Zorluk: {recipe.difficulty}</h1>
    </div>
  );
};

export default Detail;
