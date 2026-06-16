import { db } from "@/firebase/firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs
} from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";

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