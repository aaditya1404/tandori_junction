"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
    doc,
    updateDoc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

import { setUser } from "@/redux/slices/authSlice";

export default function CompleteProfile() {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);

    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [loading, setLoading] = useState(false);

    const isUsernameAvailable = async (username) => {
        const usersRef = collection(db, "users");

        const q = query(
            usersRef,
            where("username", "==", username.trim().toLowerCase())
        );

        const snapshot = await getDocs(q);

        // No user found
        if (snapshot.empty) {
            return true;
        }

        // If the only match is the current user,
        // then it's still valid.
        if (
            snapshot.docs.length === 1 &&
            snapshot.docs[0].id === user.uid
        ) {
            return true;
        }

        return false;
    };

    useEffect(() => {
        if (!user) return;

        // Already completed
        if (user.username && user.phoneNumber) {
            router.replace("/");
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            alert("Username is required");
            return;
        }

        const available = await isUsernameAvailable(username);

        if (!available) {
            alert("Username already exists.");

            return;
        }

        if (!phoneNumber || !isValidPhoneNumber(phoneNumber)) {
            alert("Enter a valid phone number");
            return;
        }

        try {
            setLoading(true);

            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, {
                username: username.trim().toLowerCase(),
                phoneNumber,
            });

            // Fetch latest data
            const snap = await getDoc(userRef);

            if (snap.exists()) {
                dispatch(setUser(snap.data()));
            }

            router.replace("/");
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
            <div className="w-full max-w-md rounded-xl bg-neutral-900 p-6 border border-neutral-800">

                <h1 className="text-3xl font-bold text-white mb-2">
                    Complete Profile
                </h1>

                <p className="text-neutral-400 mb-6">
                    Please complete your profile to continue.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="text-white block mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 p-3 text-white outline-none"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="text-white block mb-2">
                            Phone Number
                        </label>

                        <PhoneInput
                            international
                            defaultCountry="IN"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                            className="bg-white rounded-lg p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 hover:bg-orange-700 transition rounded-lg py-3 text-white font-semibold"
                    >
                        {loading ? "Saving..." : "Save & Continue"}
                    </button>

                </form>
            </div>
        </div>
    );
}