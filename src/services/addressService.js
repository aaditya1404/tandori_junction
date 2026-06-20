import { db } from "@/firebase/firebase";

import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Save Address
 */
export const saveAddress = async (
  userId,
  addressData
) => {
  try {
    const docRef = await addDoc(
      collection(
        db,
        "users",
        userId,
        "addresses"
      ),
      {
        ...addressData,
        isDefault: false,
        createdAt: new Date().toISOString(),
      }
    );

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

/**
 * Get All Addresses
 */
export const getAddresses = async (
  userId
) => {
  try {
    const snapshot = await getDocs(
      collection(
        db,
        "users",
        userId,
        "addresses"
      )
    );

    const addresses = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    return {
      success: true,
      addresses,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Delete Address
 */
export const deleteAddress = async (
  userId,
  addressId
) => {
  try {
    await deleteDoc(
      doc(
        db,
        "users",
        userId,
        "addresses",
        addressId
      )
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

/**
 * Update Address
 */
export const updateAddress = async (
  userId,
  addressId,
  updatedData
) => {
  try {
    await updateDoc(
      doc(
        db,
        "users",
        userId,
        "addresses",
        addressId
      ),
      updatedData
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