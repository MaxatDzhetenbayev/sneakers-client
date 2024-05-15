import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getAllClothes } from "../api/clothes";

function Home() {
  const [searchValue, setSearchValue] = useState("");

  const renderItems = () => {
    const [clothes, setClothes] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = getAllClothes(setClothes, setIsLoading);
        return () => unsubscribe();
    }, []);
    const filtredItems = clothes?.filter((item) => {
      return item.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
    });

    return (
      <>
        {(isLoading ? [...Array(8)] : filtredItems)?.map((item, index) => (
          <Card
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
          />
        ))}
      </>
    );
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Вся одежда"}
        </h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
