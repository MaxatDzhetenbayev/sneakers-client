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



  const totalPrice = (cartItems) =>  cartItems?.reduce((sum, obj) => {
    const options = obj.options
    let totalItemPrice = 0
    for (const key in options) {

      totalItemPrice += options[key].count * obj.price
    }
    return totalItemPrice + sum
  }
    , 0);

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

  return (
    <div className="profile">
      <button
        className="button button__red"
        onClick={() => {
          signOut(auth);
          navigate("/");
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
                  <p><strong>Заказ №</strong>  - {order.id}</p>
                  <p><strong>Статус</strong> - {showStatus(order.status)}</p>
                  <p><strong>Сумма заказа</strong> - {totalPrice(order.products)}</p>
                  <p><strong>Дата заказа</strong> - {order.date}</p>
                  <strong>Товары в заказе:</strong>
                  <ul>
                    {order.products.map((item) => {
                     
                     
                     return <li key={item.id}>
                        <strong>{item.title}</strong> 
                        <ul>
                          {item.options.map((option) => <li> Размер {option.size} - {option.count}шт</li>)}
                        </ul> 
                      </li>
                    })}
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
