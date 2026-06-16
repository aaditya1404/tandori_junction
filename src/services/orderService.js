import { db } from "@/firebase/firebase";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  query,
  where,
  getDocs,
  
} from "firebase/firestore";
import {
 
 
  updateDoc,
  doc,
} from "firebase/firestore";
export const createOrder = async (
  orderData
) => {
  try {
    const docRef = await addDoc(
      collection(db, "orders"),
      {
        ...orderData,
        status: "pending",
        createdAt: serverTimestamp(),
      }
    );

    return {
      success: true,
      orderId: docRef.id,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }
};


export const getUserOrders = async (
  userId
) => {
  try {
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId)
    );

    const snapshot =
      await getDocs(q);

    const orders =
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    return {
      success: true,
      orders,
    };

  } catch (error) {

    return {
      success: false,
      error: error.message,
    };

  }
};
export const getAllOrders =
  async () => {

  try {

    const snapshot =
      await getDocs(
        collection(
          db,
          "orders"
        )
      );

    const orders =
      snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

    return {
      success: true,
      orders,
    };

  } catch (error) {

    return {
      success: false,
      error: error.message,
    };

  }

};
export const updateOrderStatus =
  async (
    orderId,
    status
  ) => {

  try {

    await updateDoc(
      doc(
        db,
        "orders",
        orderId
      ),
      {
        status,
      }
    );

    return {
      success: true,
    };

  } catch (error) {

    return {
      success: false,
      error: error.message,
    };

  }

};