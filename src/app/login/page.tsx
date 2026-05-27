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
            style={{
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                padding: "2rem",
            }}
        >
            {/* Glass Card */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "16px",
                    padding: "2.5rem",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                }}
            >
                <h1
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                        textAlign: "center",
                    }}
                >
                    {loading ? "Processing..." : "Admin Login"}
                </h1>

                <p
                    style={{
                        textAlign: "center",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.6)",
                        marginBottom: "2rem",
                    }}
                >
                    Welcome back, please sign in
                </p>

                {/* Username */}
                <label style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
                    Username
                </label>
                <input
                    type="text"
                    value={user.username}
                    placeholder="Enter username"
                    onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "6px",
                        marginBottom: "16px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "rgba(255,255,255,0.08)",
                        color: "#fff",
                        outline: "none",
                    }}
                />

                {/* Password */}
                <label style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
                    Password
                </label>
                <input
                    type="password"
                    value={user.password}
                    placeholder="Enter password"
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "6px",
                        marginBottom: "20px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "rgba(255,255,255,0.08)",
                        color: "#fff",
                        outline: "none",
                    }}
                />

                {/* Button */}
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        cursor: buttonDisabled ? "not-allowed" : "pointer",
                        background: buttonDisabled
                            ? "rgba(255,255,255,0.2)"
                            : "linear-gradient(90deg, #4f46e5, #7c3aed)",
                        color: "#fff",
                        fontWeight: 600,
                        transition: "0.3s",
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}