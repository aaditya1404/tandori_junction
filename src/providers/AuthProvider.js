"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { observeAuthState } from "@/services/authService";

import { setUser, clearUser } from "@/redux/slices/authSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = observeAuthState(async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(clearUser());
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          dispatch(
            setUser({
              firebaseUser,
              profile: userSnap.data(),
            })
          );
        } else {
          dispatch(
            setUser({
              firebaseUser,
              profile: null,
            })
          );
        }
      } catch (error) {
        console.error(error);
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}