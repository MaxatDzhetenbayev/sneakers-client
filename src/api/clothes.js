import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  deleteDoc,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

export const getAllClothes = (callback, setIsLoading) => {
  const clothesCollectionRef = collection(db, "clothes");

  const unsubscribe = onSnapshot(clothesCollectionRef, (snapshot) => {
    const clothesData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    callback(clothesData); // Возвращаем данные через callback
    setIsLoading(false);
  });

  return unsubscribe;
};

export const addClothes = async (file, payload) => {
  try {
    const storage = getStorage();
    const docId = uuid();

    const fileName = `${new Date().getTime()}_${file.name}`;
    const fileRef = storageRef(storage, `clothes/${fileName}`);

    const snapshot = await uploadBytes(fileRef, file);
    const imageurl = await getDownloadURL(snapshot.ref);

    const docRef = doc(db, "clothes", docId);

    await setDoc(docRef, { ...payload, imageurl });
    console.log("Документ успешно добавлен с ID: ", docRef.id);
  } catch (e) {
    console.error("Ошибка при добавлении документа: ", e);
  }
};

export const deleteClothes = async (id) => {
  try {
    await deleteDoc(doc(db, "clothes", id));
    console.log("Документ успешно удален с ID: ", id);
  } catch (e) {
    console.error("Ошибка при удалении документа: ", e);
  }
}


export const addToCart = async (item, userId, size) => {

  if (!size) return toast.error("Выберите размер!");

  const cartRef = collection(db, "carts");
  const cartQuery = query(
    cartRef,
    where("userId", "==", userId),
    where("productId", "==", item.id)
  );


  try {
    const cartSnapshot = await getDocs(cartQuery);
    // console.log(cartSnapshot.docs.filter(doc => doc.data().productId === productId))

    if (cartSnapshot.empty) {
      const docId = uuid();
      const docRef = doc(db, "carts", docId);
      await setDoc(docRef, { userId, productId: item.id, options: { [size]: { count: 1, title: size } } });
      console.log("Продукт успешно добавлен в корзину ID: ", docRef.id);
      return;
    }


    const existingProduct = cartSnapshot.docs.find(doc => doc.data().productId === item.id && doc.data().options[size]);
    if (existingProduct) {
      const docId = existingProduct.id;
      const docRef = doc(db, "carts", docId);
      const cartData = existingProduct.data();
      await setDoc(docRef, { ...cartData, options: { ...cartData.options, [size]: { count: cartData.options[size].count + 1 } } });
      console.log("Количество продукта увеличено ID: ", docRef.id);
      return;
    } else {
      const docId = cartSnapshot.docs[0].id;
      const docRef = doc(db, "carts", docId);
      const cartData = cartSnapshot.docs[0].data();
      await setDoc(docRef, { ...cartData, options: { ...cartData.options, [size]: { count: 1, title: size } } });
      console.log("Продукт с другим размером добавлен в корзину ID: ", docRef.id);
    }
  } catch (error) {
    console.error("Ошибка при добавлении продукта в корзину: ", error);
  }
};

export const removeFromCart = async (userId, productId, size, isDelete = true) => {
  try {
    const q = query(
      collection(db, "carts"),
      where("userId", "==", userId),
      where("productId", "==", productId)
    );
    const cartSnapshot = await getDocs(q);

    if (cartSnapshot.empty) {
      console.log("Не найдено продуктов в корзине для удаления.");
      return;
    }

    const docId = cartSnapshot.docs[0].id;
    const docRef = doc(db, "carts", docId);
    const cartData = cartSnapshot.docs[0].data();

    if (isDelete) {
      await deleteDoc(docRef);
      console.log("Удален продукт из корзины с ID: ", docId);
      return;
    }

    const currentCount = cartData.options[size]?.count || 0;

    if (currentCount > 1) {
      await setDoc(docRef, {
        ...cartData,
        options: {
          ...cartData.options,
          [size]: { count: currentCount - 1 }
        }
      });
    } else {
      const updatedOptions = { ...cartData.options };
      delete updatedOptions[size];

      if (Object.keys(updatedOptions).length === 0) {
        await deleteDoc(docRef);
        console.log("Удален продукт из корзины с ID: ", docId);
      } else {
        await setDoc(docRef, {
          ...cartData,
          options: updatedOptions
        });
        console.log("Обновлено количество продукта в корзине с ID: ", docId);
      }
    }
  } catch (error) {
    console.error("Ошибка при удалении продукта из корзины: ", error);
  }
};

export const fetchCartProducts = (userId, setCarts, setIsLoading) => {
  const cartCollection = collection(db, "carts");
  const cartQuery = query(cartCollection, where("userId", "==", userId));

  const unsubscribe = onSnapshot(cartQuery, async (querySnapshot) => {
    const cartListData = querySnapshot.docs.map((doc) => doc.data());
    const cartListIds = querySnapshot.docs.map((doc) => doc.data().productId);
    if (cartListIds.length === 0) {
      setCarts([]);
      setIsLoading(false);
      return;
    }

    const clothesQuery = query(
      collection(db, "clothes"),
      where("__name__", "in", cartListIds)
    );

    const clothesSnapshot = await getDocs(clothesQuery);
    const clothesItems = clothesSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        options: cartListData.find((item) => item.productId === doc.id).options,
      };
    });

    setCarts(clothesItems);
    setIsLoading(false);
  });
  return unsubscribe;
};

export const addToOrder = async (user) => {
  const { uid: userId, email } = user;


  try {
    const cartRef = collection(db, "carts");
    const cartQuery = query(cartRef, where("userId", "==", userId));

    const cartSnapshot = await getDocs(cartQuery);

    if (cartSnapshot.empty) {
      console.log("Корзина пуста! Добавьте товары в корзину.");
      return;
    }

    const cartListIds = cartSnapshot.docs.map((doc) => doc.data().productId);
    const cartListData = cartSnapshot.docs.map((doc) => doc.data());
    if (cartListIds.length === 0) {
      return;
    }

    const clothesQuery = query(
      collection(db, "clothes"),
      where("__name__", "in", cartListIds)
    );

    const clothesSnapshot = await getDocs(clothesQuery);
    const clothesItems = clothesSnapshot.docs.map((doc) => {

      const optionsData = cartListData.find((item) => item.productId === doc.id).options;
      const readyData = Object.keys(optionsData).map((key) => {
        return {
          size: key,
          count: optionsData[key].count,
        };
      });

      return {
        id: doc.id,
        ...doc.data(),
        options: readyData,
      };
    });

    const orderId = uuid();
    const orderRef = collection(db, "orders");
    const orderDocRef = doc(orderRef, orderId);
    await setDoc(orderDocRef, {
      userId,
      email,
      products: clothesItems,
      status: "processing",
      date: new Date().toLocaleString(),
    });


    emailjs
      .send('service_j3kkoql', 'template_d6iil4i', { orderId, email, products: clothesItems }, 'myx63XfRfUvzWa19x',)
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );



    toast.success("Заказ успешно оформлен! ID заказа: " + orderId);

    const batch = writeBatch(db);
    cartSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  } catch (error) {
    console.error("Ошибка при заказе продукта! Попробуйте заново.: ", error);
  }
};

export const getUserOrders = async (userId) => {
  if (!userId) return;
  const ordersRef = collection(db, "orders");
  const ordersQuery = query(ordersRef, where("userId", "==", userId));

  const ordersSnapshot = await getDocs(ordersQuery);
  const ordersList = ordersSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return ordersList;
};
