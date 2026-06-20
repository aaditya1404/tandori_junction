// "use client";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
// import { observeAuthState } from "@/services/authService";

// import { setUser, clearUser } from "@/redux/slices/authSlice";

// export default function AuthProvider({ children }) {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const unsubscribe = observeAuthState(async (firebaseUser) => {
//             if (!firebaseUser) {
//                 dispatch(clearUser());
//                 return;
//             }

//             try {
//                 const userRef = doc(db, "users", firebaseUser.uid);
//                 const userSnap = await getDoc(userRef);
//                 const userData = userSnap.exists() ? userSnap.data() : {};

//                 if (userSnap.exists()) {
//                     dispatch(
//                         setUser({
//                             uid: firebaseUser.uid,
//                             name: firebaseUser.displayName,
//                             email: firebaseUser.email,
//                             photoURL: firebaseUser.photoURL,
//                             role: userData.role || "user",
//                         })
//                     );
//                 } else {
//                     dispatch(
//                         setUser({
//                             uid: firebaseUser.uid,
//                             name: firebaseUser.displayName,
//                             email: firebaseUser.email,
//                             photoURL: firebaseUser.photoURL,
//                             role: userData.role || "user",
//                         })
//                     );
//                 }
//             } catch (error) {
//                 console.error(error);
//                 dispatch(clearUser());
//             }
//         });

//         return () => unsubscribe();
//     }, [dispatch]);

//     return children;
// }

// "use client";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useRouter, usePathname } from "next/navigation";

// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/firebase/firebase";

// import { observeAuthState } from "@/services/authService";

// import {
//     setUser,
//     clearUser,
// } from "@/redux/slices/authSlice";

// export default function AuthProvider({ children }) {
//     const dispatch = useDispatch();

//     const router = useRouter();

//     const pathname = usePathname();

//     useEffect(() => {
//         const unsubscribe = observeAuthState(async (firebaseUser) => {
//             if (!firebaseUser) {
//                 dispatch(clearUser());
//                 return;
//             }

//             try {
//                 const userRef = doc(db, "users", firebaseUser.uid);

//                 const userSnap = await getDoc(userRef);

//                 if (!userSnap.exists()) {
//                     dispatch(clearUser());
//                     return;
//                 }

//                 const userData = userSnap.data();

//                 // ✅ Always store the full Firestore user in Redux
//                 dispatch(setUser(userData));

//                 // ✅ Redirect to complete profile if required
//                 if (
//                     (!userData.username || !userData.phoneNumber) &&
//                     pathname !== "/complete-profile"
//                 ) {
//                     router.push("/complete-profile");
//                 }

//             } catch (error) {
//                 console.error("AuthProvider Error:", error);
//                 dispatch(clearUser());
//             }
//         });

//         return () => unsubscribe();
//     }, [dispatch, router, pathname]);

//     return children;
// }

"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

import { observeAuthState } from "@/services/authService";

import {
    setUser,
    clearUser,
} from "@/redux/slices/authSlice";

export default function AuthProvider({ children }) {
    const dispatch = useDispatch();

    const router = useRouter();

    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = observeAuthState(async (firebaseUser) => {
            // User not logged in
            if (!firebaseUser) {
                dispatch(clearUser());
                return;
            }

            try {
                // Get Firestore user
                const userRef = doc(db, "users", firebaseUser.uid);

                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    dispatch(clearUser());
                    return;
                }

                const userData = userSnap.data();

                // Store full Firestore user in Redux
                dispatch(setUser(userData));

                const isAdmin =
                    userData.role === "admin" || userData.role === "superadmin";

                const profileComplete =
                    !!userData.username && !!userData.phoneNumber;

                // Incomplete profile -> redirect to complete-profile
                if (
                    !isAdmin &&
                    !profileComplete &&
                    pathname !== "/complete-profile"
                ) {
                    router.replace("/complete-profile");
                    return;
                }

                // Completed profile -> prevent access to complete-profile
                if (
                    profileComplete &&
                    pathname === "/complete-profile"
                ) {
                    router.replace("/");
                    return;
                }

            } catch (error) {
                console.error("AuthProvider Error:", error);
                dispatch(clearUser());
            }
        });

        return () => unsubscribe();
    }, [dispatch, router, pathname]);

    return children;
}