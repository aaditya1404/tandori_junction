import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
} from "@/firebase/firebase";
import {
  deleteDoc,
  doc,
} from "firebase/firestore";
export const addExpense =
  async (
    expenseData
  ) => {

    try {

      await addDoc(
        collection(
          db,
          "expenses"
        ),
        {
          ...expenseData,
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

export const getAllExpenses =
  async () => {

    try {

      const q =
        query(
          collection(
            db,
            "expenses"
          ),
          orderBy(
            "createdAt",
            "desc"
          )
        );

      const snapshot =
        await getDocs(q);

      const expenses =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      return {
        success: true,
        expenses,
      };

    } catch (error) {

      return {
        success: false,
        error:
          error.message,
      };

    }

  };
  export const deleteExpense =
  async (id) => {

    try {

      await deleteDoc(
        doc(
          db,
          "expenses",
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