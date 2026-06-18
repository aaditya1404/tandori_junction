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

export const getMenuHero =
  async () => {

    try {

      const snapshot =
        await getDoc(
          doc(
            db,
            "settings",
            "menuHero"
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
  export const updateMenuHero =
  async (data) => {

    try {

      await updateDoc(
        doc(
          db,
          "settings",
          "menuHero"
        ),
        data
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