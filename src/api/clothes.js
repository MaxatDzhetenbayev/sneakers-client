import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import db from "../firebaseConfig";
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
