import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "@/firebase/firebase";

export const getRestaurantInfo =
  async () => {

    try {

      const snapshot =
        await getDoc(
          doc(
            db,
            "settings",
            "restaurant"
          )
        );

      if (
        !snapshot.exists()
      ) {

        return {
          success: false,
        };

      }

      return {
        success: true,
        data:
          snapshot.data(),
      };

    } catch (error) {

      return {
        success: false,
        error:
          error.message,
      };

    }

  };