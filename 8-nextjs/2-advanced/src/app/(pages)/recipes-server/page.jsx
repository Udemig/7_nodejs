import Image from "next/image";
import { fetchRecipes } from "../../../utils/api";
import Link from "next/link";
import delay from "../../../utils/delay";

// statik olan bu sayfayı dinamik hale çevirir
// sayfa içeriğinin çok sık güncellendiği borsa / crypto / mesajlaşma sayfalarında kullanılır
// export const dynamic = "force-dynamic";

// statik sayfa içeriğinin belirli aralıklara yeniden oluşturulmasını sağlar
// sayfa içeriğini bir çok sık güncellenmediği yinde belirli aralıklara değişitği sayfalarda kullanılır
export const revalidate = 300;

// server component
const RecipesServer = async () => {
  await delay(3000);
  const data = await fetchRecipes();

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Tarifler</h1>

      {data.recipes.map((item) => (
        <Link
          href={`/recipes-server/${item.id}`}
          key={item.id}
          className="flex gap-4 mt-5 p-4 rounded-md border"
        >
          <Image src={item.image} alt={item.name} width={150} height={150} />

          <div>
            <h1>{item.name}</h1>
            <h2>{item.cuisine}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipesServer;
