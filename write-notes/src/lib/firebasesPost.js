import { Timestamp } from "firebase/firestore";
import { db, collection, addDoc } from "./firebase";

// Add a new document with a generated id.
export const posting = async (titleBox, textBox) => {
  await addDoc(collection(db, "posts"), {
    title: titleBox,
    description: textBox,
    user: auth.currentUser.email,
    modification: Timestamp,
    createdAt: serverTimestamp(),
    uid: auth.currentUser.uid,
  });
};
