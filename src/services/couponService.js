import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
} from "@/firebase/firebase";

export const addCoupon =
  async (coupon) => {

    try {

      await addDoc(
        collection(
          db,
          "coupons"
        ),
        {
          ...coupon,
          createdAt:
            serverTimestamp(),
        }
      );

      return {
        success: true,
      };

    } catch (error) {

      return {
        success: false,
        error:
          error.message,
      };

    }

  };

export const getCoupons =
  async () => {

    try {

      const snapshot =
        await getDocs(
          collection(
            db,
            "coupons"
          )
        );

      return {
        success: true,
        coupons:
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          ),
      };

    } catch (error) {

      return {
        success: false,
        error:
          error.message,
      };

    }

  };

export const deleteCoupon =
  async (id) => {

    try {

      await deleteDoc(
        doc(
          db,
          "coupons",
          id
        )
      );

      return {
        success: true,
      };

    } catch (error) {

      return {
        success: false,
        error:
          error.message,
      };

    }

  };