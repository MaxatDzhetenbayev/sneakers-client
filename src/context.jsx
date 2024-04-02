import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [itemsResponse, favoritsResponse] = await Promise.all([
        axios.get("http://localhost:3000/items"),
        axios.get("http://localhost:3000/favorites"),
      ]);
      setIsLoading(false);
      setItems(itemsResponse.data);
      setFavorites(favoritsResponse.data);
    }

    fetchData();
  }, []);

  //   const onAddToCart = async (obj) => {
  //     try {
  //       const findItem = cartItems.find(
  //         (item) => Number(item.parentId) === Number(obj.id)
  //       );
  //       if (findItem) {
  //         setCartItems((prev) =>
  //           prev.filter((item) => Number(item.parentId) !== Number(obj.id))
  //         );
  //         await axios.delete(
  //           `https://60d62397943aa60017768e77.mockapi.io/cart/${findItem.id}`
  //         );
  //       } else {
  //         setCartItems((prev) => [...prev, obj]);
  //         const { data } = await axios.post(
  //           "https://60d62397943aa60017768e77.mockapi.io/cart",
  //           obj
  //         );
  //         setCartItems((prev) =>
  //           prev.map((item) => {
  //             if (item.parentId === data.parentId) {
  //               return {
  //                 ...item,
  //                 id: data.id,
  //               };
  //             }
  //             return item;
  //           })
  //         );
  //       }
  //     } catch (error) {
  //       alert("Ошибка при добавлении в корзину");
  //       console.error(error);
  //     }
  //   };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://60d62397943aa60017768e77.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    console.log(obj.favoriteId);
    try {
      if (
        favorites.find((favObj) => Number(favObj.id) === Number(obj.favoriteId))
      ) {
        axios.delete(`http://localhost:3000/favorites${obj.id}`);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.favoriteId))
        );
      } else {
        const { data } = await axios.post("http://localhost:3000/favorites", {
          itemid: obj.id,
        });
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        isLoading,
        searchValue,
        setSearchValue,
        onChangeSearchInput,
        //   cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        //   onAddToCart,
        //   setCartOpened,
        //   setCartItems,
        //   onRemoveItem,
        //   cartOpened,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
