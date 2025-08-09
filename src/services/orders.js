// src/services/orders.js
import { db } from "../firebase";
import {
  collection, addDoc, getDoc, doc, getDocs, query, where,
  serverTimestamp
} from "firebase/firestore";

/** Create an order and return its Firestore id */
export async function createOrder({ user, address, items, totals }) {
  const payload = {
    userId: user?.uid || null,
    email: user?.email || null,
    address,            // {name, phone, email, line1, line2, city, zip}
    items,              // [{id,title,price,image,qty}]
    totals,             // {count, subtotal, shipping, total}
    status: "processing",
    createdAt: serverTimestamp(),
  };
  const ref = await addDoc(collection(db, "orders"), payload);
  return ref.id;
}

/** Get current user's orders (simple, client-side sort by createdAt) */
export async function getMyOrders(uid) {
  const q = query(collection(db, "orders"), where("userId", "==", uid));
  const snap = await getDocs(q);
  const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  // client-side sort newest first (createdAt may be Timestamp or undefined)
  arr.sort((a,b) => (b.createdAt?.seconds||0) - (a.createdAt?.seconds||0));
  return arr;
}

/** Optional: get a single order by id */
export async function getOrder(id) {
  const d = await getDoc(doc(db, "orders", id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}
