import { auth, db } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

const provider = new GoogleAuthProvider();

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // Check if user already exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    // If user doesn't exist, create one
    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        role: "user"
      });
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Google Sign-In Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Logout Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Get current logged-in user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Listen for authentication state changes.
 * Returns the unsubscribe function.
 */
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};