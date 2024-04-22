import React, { useEffect, useState } from "react";
import Info from "../Info";
import styles from "./Drawer.module.scss";
import { addToOrder, getCartProducts, removeFromCart } from "../../api/clothes";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

function Drawer({ onClose, opened }) {
  const [items, setItems] = useState([]);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const user = useAuth();
  const { totalPrice } = useCart();
  useEffect(() => {
    setIsLoading(true);
    const handleGetCarts = async () => {
      const data = await getCartProducts(user?.uid);
      setItems(data);
      setIsLoading(false);
    };

    handleGetCarts();
  }, [opened, user]);

  const onClickOrder = async (id, productId, productInfo) => {
    try {
      addToOrder(id, productId, productInfo);
    } catch (error) {}
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>
        {isLoading ? (
          <div>Загрузка...</div>
        ) : items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{
                      backgroundImage: `url(${obj.imageurl})`,
                    }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} тг.</b>
                  </div>
                  <img
                    onClick={() => removeFromCart(user.uid, obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  {/* total */}

                  <b>{totalPrice} тг. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={() =>
                  onClickOrder(user.id, obj.id, {
                    status: "Отправка",
                    value: 1,
                  })
                }
                className="greenButton"
              >
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
