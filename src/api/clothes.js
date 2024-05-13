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
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { v4 as uuid } from "uuid";

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

export const getAllClothes = async () => {
  const clothesCollectionRef = collection(db, "clothes");
  const data = await getDocs(clothesCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const addToCart = async (userId, productId) => {
  const cartRef = collection(db, "carts");
  const cartQuery = query(
    cartRef,
    where("userId", "==", userId),
    where("productId", "==", productId)
  );

  try {
    const cartSnapshot = await getDocs(cartQuery);

    if (!cartSnapshot.empty) {
      const docId = cartSnapshot.docs[0].id;
      const docRef = doc(db, "carts", docId);
      const cartData = cartSnapshot.docs[0].data();
      await setDoc(docRef, { ...cartData, count: cartData.count + 1 });
      return;
    }

    const docId = uuid();
    const docRef = doc(db, "carts", docId);

    await setDoc(docRef, { userId, productId, count: 1 });
    console.log("Продукт успешно добавлен в корзину ID: ", docRef.id);
  } catch (error) {
    console.error("Ошибка при добавлении продукта в корзину: ", error);
  }
};

export const removeFromCart = async (userId, productId, isDelete = true) => {
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
      const document = cartSnapshot.docs[0];
      await deleteDoc(doc(db, "carts", document.id));
      console.log("Удален продукт из корзины с ID: ", document.id);
      return;
    }

    await setDoc(docRef, { ...cartData, count: cartData.count - 1 });
  } catch (error) {
    console.error("Ошибка при удалении продукта из корзины: ", error);
  }
};

export const addToOrder = async (userId, productId, productInfo) => {
  try {
    const docId = uuid();
    const docRef = doc(db, "order", docId);

    await setDoc(docRef, { userId, productId, ...productInfo });
    console.log("Продукт успешно заказан! Ожидайте звонка.: ", docRef.id);
  } catch (error) {
    console.error("Ошибка при заказе продукта! Попробуйте заново.: ", error);
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
        count: cartListData.find((item) => item.productId === doc.id).count,
      };
    });

    setCarts(clothesItems);
    setIsLoading(false);
  });
  return unsubscribe;
};
