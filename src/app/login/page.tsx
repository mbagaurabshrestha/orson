"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("login success", response.data);
            router.push("/profile");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || "Login failed");
            } else {
                toast.error("Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    const buttonDisabled = !user.username || !user.password || loading;

    return (
        <div
            className="font-sans bg-white min-h-screen flex items-center justify-center text-black p-8"
        >
            {/* Glass Card */}
            <div
                className="w-full max-w-105 bg-gray-100 backdrop-blur-md border border-gray-200 rounded-2xl p-10 shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
            >
                <h1
                    className="text-[1.8rem] font-bold mb-2 text-center"
                >
                    {loading ? "Processing..." : "Admin Login"}
                </h1>

                <p className="text-center text-[13px] text-black mb-8">
                    Welcome back, please sign in
                </p>

                {/* Username */}
                <label className="text-[13px] text-black">
                    Username
                </label>
                <input
                    type="text"
                    value={user.username}
                    placeholder="Enter username"
                    onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                    }
                    className="w-full p-3 mt-2 mb-4 rounded-[10px] border border-gray-300 bg-white/8 color-black outline-none"
                />

                {/* Password */}
                <label className="text-[13px] text-black">
                    Password
                </label>
                <input
                    type="password"
                    value={user.password}
                    placeholder="Enter password"
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    className="w-full p-3 mt-1.5 mb-5 rounded-[10px] border border-gray-300 bg-white/8 color-black outline-none"
                />

                {/* Button */}
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled}
                    className={`w-full p-3 rounded-[10px] text-white active:scale-95 transition-transform duration-500 font-semibold ${
  buttonDisabled 
    ? "cursor-not-allowed bg-blue-500" 
    : "cursor-pointer bg-linear-to-r from-[#4f46e5] to-[#7c3aed]"
}`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}