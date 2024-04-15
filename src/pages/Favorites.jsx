import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useAuth } from "../hooks/useAuth";
import { getFavoriteProducts } from "../api/clothes";

function Favorites() {
  const user = useAuth();
  const [products, setProducts] = useState();
  useEffect(() => {
    const handleGetProducts = async () => {
      const data = await getFavoriteProducts("wB0bpuGEwDh3kCBiQctJipEDjxj1");
      setProducts(data);
    };

    handleGetProducts();
  }, [user?.uid]);
  console.log(products);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {products?.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            // onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
