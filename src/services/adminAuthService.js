import { auth, db } from "@/firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const loginSuperAdmin = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await signOut(auth);

      return {
        success: false,
        error: "User record not found.",
      };
    }

    const userData = userSnap.data();

    if (userData.role !== "superadmin") {
      await signOut(auth);

      return {
        success: false,
        error: "Unauthorized access.",
      };
    }

    return {
      success: true,
      user,
      role: userData.role,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};