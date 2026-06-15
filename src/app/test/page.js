"use client";

import { signInWithGoogle, logoutUser } from "@/services/authService";

export default function TestPage() {
  const handleLogin = async () => {
    const res = await signInWithGoogle();
    console.log(res);

    if (res.success) {
      alert("Login Successful");
    } else {
      alert(res.error);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    alert("Logged Out");
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleLogin}>
        Login with Google
      </button>

      <br />
      <br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}