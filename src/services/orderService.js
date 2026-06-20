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
  getDoc,
  
} from "firebase/firestore";
import {
 
 
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  onSnapshot,
} from "firebase/firestore";
export const createOrder = async (
  orderData
) => {
  try {
    const docRef = await addDoc(
  collection(db, "orders"),
  {
    ...orderData,

    orderType:
      "delivery",

    status: "pending",

    createdAt:
      serverTimestamp(),

    orderDate:
      new Date()
        .toLocaleDateString(),

    orderTime:
      new Date()
        .toLocaleTimeString(),
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
export const getOrderById =
  async (orderId) => {

  try {

    const snapshot =
      await getDoc(
        doc(
          db,
          "orders",
          orderId
        )
      );

    if (!snapshot.exists()) {

      return {
        success: false,
        error: "Order not found",
      };

    }

    return {
      success: true,
      order: {
        id: snapshot.id,
        ...snapshot.data(),
      },
    };

  } catch (error) {

    return {
      success: false,
      error: error.message,
    };

  }

};
export const subscribeToOrder =
  (orderId, callback) => {

  return onSnapshot(
    doc(db, "orders", orderId),

    (snapshot) => {

      if (snapshot.exists()) {

        callback({
          id: snapshot.id,
          ...snapshot.data(),
        });

      }

    }
  );

};
export const subscribeToUserOrders =
  (userId, callback) => {

  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {

      const orders =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      callback(orders);

    }
  );

};
export const createWalkInOrder =
  async (data) => {

  try {

    const docRef =
      await addDoc(
        collection(
          db,
          "orders"
        ),
        {
          ...data,

          orderType:
            "walkin",

          status:
            "completed",

          createdAt:
            serverTimestamp(),
        }
      );

    return {
      success: true,
      id: docRef.id,
    };

  } catch (error) {

    return {
      success: false,
      error:
        error.message,
    };

  }

};
export const getNextOrderNumber =
  async () => {

  const snapshot =
    await getDocs(
      collection(
        db,
        "orders"
      )
    );

  const count =
    snapshot.size + 1;

  return `ORD-${String(
    count
  ).padStart(
    4,
    "0"
  )}`;

};
export const subscribeToAllOrders =
  (callback) => {

    return onSnapshot(
      collection(db, "orders"),

      (snapshot) => {

        const orders =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        callback(orders);

      }
    );

  };
  export const markReviewSubmitted =
  async (orderId) => {
    try {
      await updateDoc(
        doc(db, "orders", orderId),
        {
          reviewSubmitted: true,
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
  export const getDeliveredOrdersCount =
  async () => {

    try {

      const q = query(
        collection(db, "orders"),
        where("status", "==", "delivered")
      );

      const snapshot =
        await getDocs(q);

      return {
        success: true,
        count: snapshot.size,
      };

    } catch (error) {

      return {
        success: false,
        error: error.message,
      };

    }

  };