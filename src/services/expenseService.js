import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
} from "@/firebase/firebase";

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