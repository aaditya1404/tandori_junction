import { db } from "@/firebase/firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

export const getAllUsers =
  async () => {

  try {

    const snapshot =
      await getDocs(
        collection(
          db,
          "users"
        )
      );

    const users =
      snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

    return {
      success: true,
      users,
    };

  } catch (error) {

    return {
      success: false,
      error: error.message,
    };

  }

};