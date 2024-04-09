import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import Card from "../components/Card";
import { addClothes, getAllClothes } from "../api/clothes";
function Home() {
  const { searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite } =
    useContext(AppContext);

  const renderItems = () => {
    const [clothes, setClothes] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
      setIsLoading(true);
      const data = await getAllClothes();
      setIsLoading(false);
      setClothes(data);
    }, []);

    console.log(clothes);

    const filtredItems = clothes?.filter((item) => {
      console.log(item);
      return item.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    return (
      <>
        {(isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
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
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
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
            onChange={onChangeSearchInput}
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
