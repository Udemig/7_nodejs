"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const RecipesClient = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = () => {
    setLoading(true);

    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) return <h1>Yükleniyor...</h1>;

  if (error)
    return (
      <h1>
        {error} <button onClick={fetchRecipes}>Tekrar Dene</button>
      </h1>
    );

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Tarifler</h1>

      {recipes.map((item) => (
        <div key={item.id} className="flex gap-4 mt-5 p-4 rounded-md border">
          <Image src={item.image} alt={item.name} width={150} height={150} />

          <div>
            <h1>{item.name}</h1>
            <h2>{item.cuisine}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipesClient;
