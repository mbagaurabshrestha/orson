"use client";
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [loading, setLoading] = React.useState(false);

    const onSignup = async()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);

            console.log("signup success", response.data);
            router.push("/login");
        } catch (error: unknown){
            console.log("signup failed");

            if (axios.isAxiosError(error)){
                toast.error(error.response?.data.message || error.message);
            } else{
                toast.error("signup failed");
            }
        } finally{
            setLoading(false);
        }
    }
    const buttonDisabled = !user.email || !user.password || !user.username;

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Loading...": "Signup"}</h1>
        <hr/>

        <form className="flex flex-col items-center justify-center">

            <label htmlFor="username">Username</label>

            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="username"
            type="text"
            placeholder="enter your username"
            value={user.username}
            onChange={(e)=> setUser({...user, username: e.target.value})}
            />

            <label htmlFor="email">email</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
        id="email"
        type="text"
        placeholder="Enter your email"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        />

        <label htmlFor="password">password</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        placeholder="Enter your password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        />

        <button
        type="button" 
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onSignup}>
        {buttonDisabled ? "No Signup" : "Signup"}
        </button>

        <Link href="/login" className="text-blue-500 hover:underline mt-4">Visit login page</Link>

        </form>


        </div>
    )

}