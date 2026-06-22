"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/api";

export default function Register() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleRegister = async () => {

    try {

      setLoading(true);

      setError("");

      await api.post(

        "/auth/register",

        {

          email,

          password

        }

      );

      alert("Registration Successful");

      router.push("/login");

    }

    catch (e: any) {

      console.log(e);

      setError(

        e.response?.data?.message ||

        "Registration Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

<div className="min-h-screen bg-slate-900 flex justify-center items-center px-4">

  <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-3xl p-10 shadow-2xl">

    {/* Header */}

    <div className="text-center mb-8">

      <h1 className="text-4xl font-bold text-white mb-2">

        Create Account 🚀

      </h1>

      <p className="text-slate-400">

        Start planning your AI-powered trips

      </p>

    </div>

    {/* Error */}

    {

      error &&

      <div className="bg-red-500/10 border border-red-500 rounded-xl p-3 mb-5">

        <p className="text-red-400 text-center">

          {error}

        </p>

      </div>

    }

    {/* Email */}

    <label className="block text-slate-300 font-semibold mb-2">

      Email

    </label>

    <input

      type="email"

      placeholder="Enter your email"

      value={email}

      onChange={(e)=>

        setEmail(e.target.value)

      }

      className="

      w-full

      p-4

      rounded-xl

      bg-slate-900

      border

      border-slate-600

      text-white

      placeholder-slate-500

      focus:outline-none

      focus:ring-2

      focus:ring-blue-500

      focus:border-blue-500

      mb-5

      "

    />

    {/* Password */}

    <label className="block text-slate-300 font-semibold mb-2">

      Password

    </label>

    <input

      type="password"

      placeholder="Enter your password"

      value={password}

      onChange={(e)=>

        setPassword(e.target.value)

      }

      className="

      w-full

      p-4

      rounded-xl

      bg-slate-900

      border

      border-slate-600

      text-white

      placeholder-slate-500

      focus:outline-none

      focus:ring-2

      focus:ring-blue-500

      focus:border-blue-500

      mb-8

      "

    />

    {/* Register Button */}

    <button

      onClick={handleRegister}

      disabled={loading}

      className="

      w-full

      py-4

      rounded-xl

      bg-blue-600

      hover:bg-blue-700

      disabled:bg-slate-600

      text-white

      font-semibold

      text-lg

      transition-all

      duration-300

      hover:scale-[1.02]

      "

    >

      {

        loading

        ?

        "Registering..."

        :

        "Create Account"

      }

    </button>

    {/* Footer */}

    <p className="text-center text-slate-400 mt-6">

      Already have an account?

      <a

        href="/login"

        className="text-blue-400 hover:text-blue-300 ml-2"

      >

        Login

      </a>

    </p>

  </div>

</div>

);

}