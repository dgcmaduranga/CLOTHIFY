// src/services/messages.js
import { db } from "../firebase";
import {
  addDoc, collection, serverTimestamp, getDocs, orderBy, query,
  updateDoc, doc
} from "firebase/firestore";

export async function addMessage({ name, email, body, userId }) {
  const payload = {
    name: name || "",
    email: email || "",
    body: body || "",
    userId: userId || null,
    status: "new",
    createdAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, "messages"), payload);
  return ref.id;
}

export async function fetchAllMessages() {                 // admin only
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function markMessageRead(id) {                // admin only
  await updateDoc(doc(db, "messages", id), { status: "read" });
}
