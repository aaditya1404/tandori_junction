import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "@/firebase/firebase";

export const getHeroData =
  async () => {

    try {

      const snapshot =
        await getDoc(
          doc(
            db,
            "homepage",
            "hero"
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