// src/components/auth/LoginForm.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Divider } from "@heroui/react";
import { motion } from "framer-motion";
import {
  TbMail,
  TbLock,
  TbEye,
  TbEyeOff,
  TbArrowRight,
} from "react-icons/tb";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

export default function LoginForm() {
  const { login, googleLogin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const getDashboardRoute = (role) => {
    if (role === "admin") return "/admin";
    if (role === "owner") return "/owner";
    return "/tenant";
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const user = await login(data);
      toast.success(`Welcome back, ${user.name}!`);
      const destination =
        redirect !== "/" ? redirect : getDashboardRoute(user.role);
      router.push(destination);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const user = await googleLogin();
      toast.success(`Welcome, ${user.name}!`);
      const destination =
        redirect !== "/" ? redirect : getDashboardRoute(user.role);
      router.push(destination);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Google login failed. Please try again."
      );
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // ── shared input style (matches RegisterForm) ─────────────────────────────
  const inputBase =
    "w-full rounded-xl border border-gray-200 bg-gray-50 text-gray-900 " +
    "placeholder:text-gray-400 text-sm h-11 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "focus:bg-white transition-all duration-150";
  const inputErr = "border-red-300 focus:ring-red-400 bg-red-50";

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl text-center font-bold text-gray-900 font-heading mb-1.5">
            Welcome
          </h2>
          <p className="text-sm text-center text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Google */}
        <Button
          fullWidth
          variant="bordered"
          onPress={handleGoogleLogin}
          isLoading={isGoogleLoading}
          startContent={
            !isGoogleLoading && (
              <svg
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )
          }
          className="h-12 font-semibold text-gray-700 border-gray-200 bg-white hover:bg-gray-50 rounded-xl mb-6"
        >
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <Divider className="flex-1" />
          <span className="text-xs text-gray-400 whitespace-nowrap">
            or sign in with email
          </span>
          <Divider className="flex-1" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <TbMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Please enter a valid email",
                  },
                })}
                className={`${inputBase} pl-11 ${errors.email ? inputErr : ""}`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                prefetch={false}
                className="text-xs text-blue-500 hover:text-blue-600 font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <TbLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`${inputBase} pl-11 pr-11 ${errors.password ? inputErr : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                {showPassword ? (
                  <TbEyeOff className="w-5 h-5" />
                ) : (
                  <TbEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            endContent={!isLoading && <TbArrowRight className="w-5 h-5" />}
            className="h-12 font-semibold btn-gradient text-white rounded-xl mt-2"
          >
            Sign In
          </Button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Create one free
          </Link>
        </p>

        {/* Demo credentials */}
        <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2">
            Demo Credentials
          </p>
          <div className="space-y-1 text-xs text-gray-400">
            <p>
              <strong className="text-gray-500">Admin:</strong>{" "}
              admin@thikana.com / Admin123
            </p>
            <p>For Google login default role is TENANT</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}