// src/components/auth/RegisterForm.jsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Divider } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbUserCircle, TbMail, TbLock, TbEye, TbEyeOff,
  TbCheck, TbX, TbArrowRight, TbArrowLeft, TbPhoto,
  TbUpload, TbTrash, TbLink, TbHome, TbBuildingEstate,
} from "react-icons/tb";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

// ── Step indicator ────────────────────────────────────────────────────────────
const steps = ["Account Type", "Your Info", "Set Password"];

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-between mb-8">
    {steps.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <div key={i} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
              done    ? "bg-blue-500 border-blue-500 text-white"
              : active ? "bg-white border-blue-500 text-blue-600"
              :          "bg-white border-gray-200 text-gray-400"
            }`}>
              {done ? <TbCheck className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium whitespace-nowrap transition-colors ${
              active ? "text-blue-600" : done ? "text-gray-500" : "text-gray-300"
            }`}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-colors duration-300 ${
              done ? "bg-blue-500" : "bg-gray-100"
            }`} />
          )}
        </div>
      );
    })}
  </div>
);

// ── Password requirement row ───────────────────────────────────────────────────
const PasswordRequirement = ({ met, label }) => (
  <div className="flex items-center gap-1.5">
    {met
      ? <TbCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
      : <TbX    className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />}
    <span className={`text-xs ${met ? "text-emerald-600" : "text-gray-400"}`}>{label}</span>
  </div>
);

// ── Role card ─────────────────────────────────────────────────────────────────
const RoleOption = ({ value, selected, onSelect, icon, title, desc }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    aria-pressed={selected}
    className={`relative flex-1 flex flex-col gap-2 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
      selected
        ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100"
        : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100"
    }`}
  >
    <div className="flex items-center justify-between w-full">
      <span className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors ${
        selected ? "bg-blue-500 text-white" : "bg-white text-gray-400 border border-gray-200"
      }`}>{icon}</span>
      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
        selected ? "border-blue-500" : "border-gray-300"
      }`}>
        {selected && <span className="w-2 h-2 rounded-full bg-blue-500" />}
      </span>
    </div>
    <div>
      <p className={`text-sm font-semibold mt-1 ${selected ? "text-blue-700" : "text-gray-700"}`}>{title}</p>
      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
    </div>
  </button>
);

// ── slide variants ────────────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center:        { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

// ─────────────────────────────────────────────────────────────────────────────
export default function RegisterForm() {
  const { register: registerUser, googleLogin } = useAuth();
  const router = useRouter();

  const [step, setStep]           = useState(0);
  const [direction, setDirection] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [isLoading,       setIsLoading]       = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [selectedRole,    setSelectedRole]    = useState("tenant");

  const [photoMode,        setPhotoMode]        = useState("upload");
  const [photoFile,        setPhotoFile]        = useState(null);
  const [photoPreview,     setPhotoPreview]     = useState(null);
  const [photoUrl,         setPhotoUrl]         = useState("");
  const [photoUrlPreview,  setPhotoUrlPreview]  = useState("");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState("");
  const fileInputRef = useRef(null);

  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const password = watch("password", "");
  const passwordChecks = {
    length:    password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
  };

  // ── nav helpers ─────────────────────────────────────────────────────────────
  const goTo = (next) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleNext = async () => {
    if (step === 1) {
      const valid = await trigger(["name", "email"]);
      if (!valid) return;
    }
    goTo(step + 1);
  };

  // ── photo helpers ───────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file."); return; }
    if (file.size > 5 * 1024 * 1024)    { toast.error("Image must be smaller than 5 MB."); return; }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setUploadedPhotoUrl("");
  };

  const handleRemoveFile = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setUploadedPhotoUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadToImgbb = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    const res  = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: "POST", body: fd });
    const data = await res.json();
    if (!data.success) throw new Error("imgbb upload failed");
    return data.data.url;
  };

  // ── submit ──────────────────────────────────────────────────────────────────
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let finalPhotoUrl = "";
      if (photoMode === "upload" && photoFile) {
        setIsUploadingPhoto(true);
        finalPhotoUrl = await uploadToImgbb(photoFile);
        setUploadedPhotoUrl(finalPhotoUrl);
        setIsUploadingPhoto(false);
      } else if (photoMode === "url" && photoUrl) {
        finalPhotoUrl = photoUrl;
      }
      const user = await registerUser({
        name: data.name.trim(), email: data.email.trim(),
        password: data.password,
        photoURL: finalPhotoUrl || undefined,
        role: selectedRole,
      });
      toast.success(`Welcome to RentEasy, ${user.name}!`);
      router.push(selectedRole === "owner" ? "/owner" : "/tenant");
    } catch (err) {
      setIsUploadingPhoto(false);
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const user = await googleLogin({ role: "tenant" });
      toast.success(`Welcome to RentEasy, ${user.name}!`);
      router.push("/tenant");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Google sign-up failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // ── shared styles ───────────────────────────────────────────────────────────
  const inputBase =
    "w-full rounded-xl border border-gray-200 bg-gray-50 text-gray-900 " +
    "placeholder:text-gray-400 text-sm h-11 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
    "focus:bg-white transition-all duration-150";
  const inputErr = "border-red-300 focus:ring-red-400 bg-red-50";

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 font-heading mb-1">Create an Account</h2>
          <p className="text-sm text-gray-400">
            {step === 0 ? "Choose how you want to join RentEasy"
            : step === 1 ? "Tell us a bit about yourself"
            :              "Secure your account with a password"}
          </p>
        </div>

        <StepIndicator current={step} />

        {/* Animated step panels */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {/* ── STEP 0 — Account type ── */}
            {step === 0 && (
              <motion.div key="step0" custom={direction} variants={slideVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {/* Google */}
                <Button
                  fullWidth variant="bordered" onPress={handleGoogleLogin}
                  isLoading={isGoogleLoading}
                  startContent={!isGoogleLoading && (
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  className="h-12 font-semibold text-gray-700 border-gray-200 bg-white hover:bg-gray-50 rounded-xl mb-2"
                >
                  Continue with Google
                </Button>
                <p className="text-center text-xs text-gray-400 mb-5">
                  Google sign-up always creates a <strong className="text-gray-500">Tenant</strong> account
                </p>

                <div className="flex items-center gap-4 mb-5">
                  <Divider className="flex-1" />
                  <span className="text-xs text-gray-400 whitespace-nowrap">or register with email</span>
                  <Divider className="flex-1" />
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">I want to register as</label>
                <div className="flex gap-3 mb-6">
                  <RoleOption value="tenant" selected={selectedRole === "tenant"} onSelect={setSelectedRole}
                    icon={<TbHome className="w-4 h-4" />} title="Tenant" desc="Find & book rentals" />
                  <RoleOption value="owner" selected={selectedRole === "owner"} onSelect={setSelectedRole}
                    icon={<TbBuildingEstate className="w-4 h-4" />} title="Owner" desc="List your properties" />
                </div>

                <Button fullWidth onPress={() => goTo(1)}
                  endContent={<TbArrowRight className="w-5 h-5" />}
                  className="h-12 font-semibold btn-gradient text-white rounded-xl"
                >
                  Continue as {selectedRole === "owner" ? "Owner" : "Tenant"}
                </Button>
              </motion.div>
            )}

            {/* ── STEP 1 — Personal info ── */}
            {step === 1 && (
              <motion.div key="step1" custom={direction} variants={slideVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <TbUserCircle className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <input type="text" placeholder="John Doe" autoComplete="name"
                      {...register("name", {
                        required: "Full name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" },
                        maxLength: { value: 60, message: "Name cannot exceed 60 characters" },
                      })}
                      className={`${inputBase} pl-11 ${errors.name ? inputErr : ""}`}
                    />
                  </div>
                  {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <TbMail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <input type="email" placeholder="you@example.com" autoComplete="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: "Please enter a valid email" },
                      })}
                      className={`${inputBase} pl-11 ${errors.email ? inputErr : ""}`}
                    />
                  </div>
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                {/* Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Profile Photo <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  {/* Mode toggle */}
                  <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-3 p-1 bg-gray-50 gap-1">
                    {["upload", "url"].map((mode) => (
                      <button key={mode} type="button" onClick={() => setPhotoMode(mode)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                          photoMode === mode
                            ? "bg-white text-blue-600 shadow-sm border border-gray-100"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        {mode === "upload" ? <TbUpload className="w-3.5 h-3.5" /> : <TbLink className="w-3.5 h-3.5" />}
                        {mode === "upload" ? "Upload File" : "Image URL"}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {photoMode === "upload" && (
                      <motion.div key="upload" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
                        {!photoPreview ? (
                          <label htmlFor="photo-upload"
                            className="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
                          >
                            <TbPhoto className="w-7 h-7 text-gray-300 group-hover:text-blue-400 transition-colors" />
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-400 group-hover:text-blue-500 transition-colors">Click to upload photo</p>
                              <p className="text-xs text-gray-300 mt-0.5">PNG, JPG, WEBP up to 5 MB</p>
                            </div>
                            <input id="photo-upload" ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                          </label>
                        ) : (
                          <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                            <img src={photoPreview} alt="Preview" className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-700 truncate">{photoFile?.name}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{photoFile ? (photoFile.size / 1024).toFixed(0) + " KB" : ""}</p>
                              {uploadedPhotoUrl && <p className="text-xs text-emerald-500 mt-0.5 flex items-center gap-1"><TbCheck className="w-3 h-3" /> Uploaded</p>}
                            </div>
                            <button type="button" onClick={handleRemoveFile} aria-label="Remove photo"
                              className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                            ><TbTrash className="w-4 h-4" /></button>
                          </div>
                        )}
                      </motion.div>
                    )}
                    {photoMode === "url" && (
                      <motion.div key="url" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }} className="space-y-2">
                        <div className="relative">
                          <TbLink className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                          <input type="url" placeholder="https://example.com/photo.jpg"
                            value={photoUrl} onChange={(e) => { const v = e.target.value.trim(); setPhotoUrl(v); setPhotoUrlPreview(v); }}
                            className={`${inputBase} pl-11`}
                          />
                        </div>
                        <AnimatePresence>
                          {photoUrlPreview && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50"
                            >
                              <img src={photoUrlPreview} alt="Preview" onError={() => setPhotoUrlPreview("")}
                                className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
                              />
                              <p className="text-xs text-gray-400 break-all line-clamp-2">{photoUrlPreview}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Nav buttons */}
                <div className="flex gap-3 pt-1">
                  <Button variant="bordered" onPress={() => goTo(0)}
                    startContent={<TbArrowLeft className="w-4 h-4" />}
                    className="h-11 font-semibold border-gray-200 text-gray-600 rounded-xl flex-1"
                  >Back</Button>
                  <Button onPress={handleNext} endContent={<TbArrowRight className="w-5 h-5" />}
                    className="h-11 font-semibold btn-gradient text-white rounded-xl flex-[2]"
                  >Continue</Button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2 — Password ── */}
            {step === 2 && (
              <motion.div key="step2" custom={direction} variants={slideVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <div className="relative">
                      <TbLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="new-password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: { value: 6, message: "Password must be at least 6 characters" },
                          validate: {
                            hasUppercase: (v) => /[A-Z]/.test(v) || "Must contain at least one uppercase letter",
                            hasLowercase: (v) => /[a-z]/.test(v) || "Must contain at least one lowercase letter",
                          },
                        })}
                        className={`${inputBase} pl-11 pr-11 ${errors.password ? inputErr : ""}`}
                      />
                      <button type="button" onClick={() => setShowPassword((p) => !p)} aria-label={showPassword ? "Hide" : "Show"}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                      >{showPassword ? <TbEyeOff className="w-5 h-5" /> : <TbEye className="w-5 h-5" />}</button>
                    </div>
                    {password.length > 0 && (
                      <div className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100 grid grid-cols-2 gap-1.5">
                        <PasswordRequirement met={passwordChecks.length}    label="At least 6 characters" />
                        <PasswordRequirement met={passwordChecks.uppercase} label="One uppercase letter" />
                        <PasswordRequirement met={passwordChecks.lowercase} label="One lowercase letter" />
                      </div>
                    )}
                    {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>}
                  </div>

                  {/* Confirm */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <TbLock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                      <input type={showConfirm ? "text" : "password"} placeholder="••••••••" autoComplete="new-password"
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (v) => v === password || "Passwords do not match",
                        })}
                        className={`${inputBase} pl-11 pr-11 ${errors.confirmPassword ? inputErr : ""}`}
                      />
                      <button type="button" onClick={() => setShowConfirm((p) => !p)} aria-label={showConfirm ? "Hide" : "Show"}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                      >{showConfirm ? <TbEyeOff className="w-5 h-5" /> : <TbEye className="w-5 h-5" />}</button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword.message}</p>}
                  </div>

                  {/* Terms */}
                  <p className="text-xs text-gray-400 leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" prefetch={false} className="text-blue-500 hover:underline">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="/privacy" prefetch={false} className="text-blue-500 hover:underline">Privacy Policy</Link>.
                  </p>

                  {/* Nav */}
                  <div className="flex gap-3 pt-1">
                    <Button variant="bordered" onPress={() => goTo(1)}
                      startContent={<TbArrowLeft className="w-4 h-4" />}
                      className="h-12 font-semibold border-gray-200 text-gray-600 rounded-xl flex-1"
                    >Back</Button>
                    <Button type="submit" isLoading={isLoading || isUploadingPhoto}
                      endContent={!isLoading && !isUploadingPhoto && <TbArrowRight className="w-5 h-5" />}
                      className="h-12 font-semibold btn-gradient text-white rounded-xl flex-[2]"
                    >
                      {isUploadingPhoto ? "Uploading…"
                       : isLoading      ? "Creating…"
                       : selectedRole === "owner" ? "Create Owner Account" : "Create Tenant Account"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-600 font-semibold">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}