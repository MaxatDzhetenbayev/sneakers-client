import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../api/clothes";
import { useAuth } from "../hooks/useAuth";

const showStatus = (status) => {
  switch (status) {
    case "processing":
      return "В обработке";
    case "shipped":
      return "Отправлен";
    case "delivery":
      return "Доставлен";
    case "reject":
      return "Отклонен";
    default:
      return "В обработке";
  }
};

const totalPrice = (items) =>
  items?.reduce((sum, obj) => (sum + +obj.price) * +obj.count, 0);

export const Profile = () => {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const user = useAuth();
  const userId = user?.uid;

  useEffect(() => {
    const fetchOrders = async () => {
      if (userId) {
        const ordersList = await getUserOrders(userId);
        setOrders(ordersList);
      }
    };
    fetchOrders();
  }, [userId]);

  console.log(orders);
  return (
    <div className="profile">
      <button
        className="button button__red"
        onClick={() => {
          signOut(auth);
          navigate("");
        }}
      >
        Выйти с аккаунта
      </button>
      <div>
        <h3>Список моих заказов:</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxHeight: "560px",
            overflowY: "scroll",
          }}
        >
          {orders.length > 0 ? (
            orders.map((order) => {
              return (
                <div className="profile__order" key={order.id}>
                  <p>Заказ № - {order.id}</p>
                  <p>Статус - {showStatus(order.status)}</p>
                  <p>Сумма заказа - {totalPrice(order.products)}</p>
                  <p>Дата заказа: {order.date}</p>
                  <p>Товары в заказе:</p>
                  <ul>
                    {order.products.map((item) => (
                      <li key={item.id}>
                        {item.title} - {item.count} шт.
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          ) : (
            <h3>У вас пока нет заказов</h3>
          )}
        </div>
      </div>
    </div>
  );
};
