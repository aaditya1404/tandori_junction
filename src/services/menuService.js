import { db } from "@/firebase/firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    getDoc
} from "firebase/firestore";
import {
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  onSnapshot,
} from "firebase/firestore";

import { uploadImageToCloudinary } from "./uploadImage";

export const createMenuItem = async (data) => {
    try {
        const {
            name,
            description,
            price,
            discount,
            category,
            isAvailable,
            foodType,
            image,
        } = data;

        // Upload image to Cloudinary
        const imageUrl = await uploadImageToCloudinary(image);

        // Calculate final price
        const originalPrice = Number(price);
        const discountValue = Number(discount || 0);

        const finalPrice =
            originalPrice -
            (originalPrice * discountValue) / 100;

        // Save to Firestore
        const docRef = await addDoc(collection(db, "menu"), {
            name,
            description,
            price: originalPrice,
            discount: discountValue,
            finalPrice,
            category,
            isAvailable,
            foodType,
            image: imageUrl
        });

        return {
            success: true,
            id: docRef.id,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: error.message,
        };
    }
};

export const deleteMenuItemFromFirestore = async (id) => {
    try {
        await deleteDoc(doc(db, "menu", id));

        return {
            success: true,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: error.message,
        };
    }
};

export const getAllMenuItems = async () => {
    try {
        const snapshot = await getDocs(collection(db, "menu"));

        const menuItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return {
            success: true,
            data: menuItems,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            error: error.message,
        };
    }
};
export const updateAvailability =
  async (
    id,
    isAvailable
  ) => {

  try {

    await updateDoc(
      doc(
        db,
        "menu",
        id
      ),
      {
        isAvailable,
      }
    );

    return {
      success: true,
    };

  } catch (error) {

    console.error(error);

    return {
      success: false,
      error: error.message,
    };

  }

};
export const subscribeToMenu =
  (callback) => {

  return onSnapshot(
    collection(
      db,
      "menu"
    ),

    (snapshot) => {

      const items =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      callback(items);

    }
  );

};
export const getMenuItemById =
  async (id) => {

  try {

    const snapshot =
      await getDoc(
        doc(
          db,
          "menu",
          id
        )
      );

    if (!snapshot.exists()) {

      return {
        success: false,
        error: "Menu item not found",
      };

    }

    return {
      success: true,
      item: {
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
export const updateMenuItem =
  async (
    id,
    data
  ) => {

  try {

    // Admin didn't upload new image
    if (!data.image) {

      delete data.image;

    }

    await updateDoc(
      doc(
        db,
        "menu",
        id
      ),
      data
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