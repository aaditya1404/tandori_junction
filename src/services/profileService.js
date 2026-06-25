import { db } from "@/firebase/firebase";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export const getUserProfile =
  async (userId) => {
    try {
      const snapshot =
        await getDoc(
          doc(db, "users", userId)
        );

      if (!snapshot.exists()) {
        return {
          success: true,
          profile: null,
        };
      }

      return {
        success: true,
        profile: snapshot.data(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

export const saveUserProfile =
  async (userId, data) => {
    try {
      await setDoc(
        doc(db, "users", userId),
        data,
        {
          merge: true,
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