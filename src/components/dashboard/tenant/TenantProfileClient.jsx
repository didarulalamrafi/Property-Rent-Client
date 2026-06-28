// src/components/dashboard/tenant/TenantProfileClient.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Divider } from "@heroui/react";
import {
  TbUser,
  TbMail,
  TbCalendar,
  TbShield,
  TbEdit,
  TbCamera,
  TbCheck,
  TbX,
  TbUpload,
} from "react-icons/tb";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";
import { formatDate, uploadImageToImgBB } from "@/lib/utils";
import toast from "react-hot-toast";

const getUserPhoto = (user) => user?.photo || user?.photoURL || "";

function UserAvatar({ src, name, size = "w-24 h-24", textSize = "text-2xl" }) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name || "User avatar"}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${size} rounded-full object-cover ring-4 ring-white shadow-md border-2 border-blue-400`}
      />
    );
  }

  return (
    <div
      className={`${size} ${textSize} rounded-full ring-4 ring-white shadow-md border-2 border-blue-400 bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold select-none`}
    >
      {initials}
    </div>
  );
}

export default function TenantProfileClient() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    photo: getUserPhoto(user),
  });

  const currentPhoto = isEditing ? formData.photo : getUserPhoto(user);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5 MB");
      return;
    }
    setIsUploadingPhoto(true);
    try {
      const url = await uploadImageToImgBB(file);
      setFormData((p) => ({ ...p, photo: url }));
      toast.success("Photo uploaded!");
    } catch {
      toast.error("Failed to upload photo. Please try again.");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axiosInstance.patch("/users/profile", {
        name: formData.name.trim(),
        photo: formData.photo,
      });
      updateUser(res.data.data.user);
      setIsEditing(false);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: user?.name || "", photo: getUserPhoto(user) });
    setIsEditing(false);
  };

  const roleColors = {
    admin: "bg-red-50 text-red-600",
    owner: "bg-amber-50 text-amber-600",
    tenant: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-heading">
          My Profile
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your personal information and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Left: Avatar card ── */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            {/* Banner */}
            <div className="h-24 bg-blue-600 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute bottom-0 left-10 w-16 h-16 rounded-full bg-white/5" />
            </div>

            <div className="px-5 pb-5">
              {/* Avatar */}
              <div className="relative inline-block -mt-12 mb-4">
                <UserAvatar src={currentPhoto} name={user?.name} />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full cursor-pointer shadow transition-colors">
                    {isUploadingPhoto ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <TbCamera className="w-4 h-4" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                      disabled={isUploadingPhoto}
                    />
                  </label>
                )}
              </div>

              {/* Name */}
              {isEditing ? (
                <div className="mb-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 text-gray-900"
                    placeholder="Your full name"
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900 font-heading leading-tight">
                    {user?.name}
                  </h2>
                  <p className="text-sm text-gray-400 mt-0.5">{user?.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleColors[user?.role] || roleColors.tenant}`}
                    >
                      {user?.role}
                    </span>
                    {user?.isGoogleUser && (
                      <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-50 text-gray-500">
                        <svg className="w-3 h-3" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Edit / Save buttons */}
              <div className="flex flex-col gap-2">
                {isEditing ? (
                  <>
                    <Button
                      size="sm"
                      isLoading={isLoading}
                      startContent={
                        !isLoading && <TbCheck className="w-4 h-4" />
                      }
                      onPress={handleSave}
                      className="w-full bg-blue-600 text-white font-semibold"
                    >
                      Save changes
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      startContent={<TbX className="w-4 h-4" />}
                      onPress={handleCancel}
                      className="w-full bg-gray-100 text-gray-600 font-semibold"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<TbEdit className="w-4 h-4" />}
                    onPress={() => {
                      setFormData({
                        name: user?.name || "",
                        photo: getUserPhoto(user),
                      });
                      setIsEditing(true);
                    }}
                    className="w-full bg-gray-100 text-gray-700 font-semibold"
                  >
                    Edit profile
                  </Button>
                )}
              </div>

              {/* Photo URL input */}
              {isEditing && (
                <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-600 mb-2 flex items-center gap-1.5">
                    <TbUpload className="w-3.5 h-3.5" />
                    Photo URL (optional)
                  </p>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.photo}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, photo: e.target.value }))
                    }
                    className="w-full px-3 py-2 text-xs border border-blue-200 rounded-xl bg-white focus:outline-none focus:border-blue-400 text-gray-700"
                  />
                  {formData.photo && (
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src={formData.photo}
                        alt="Preview"
                        referrerPolicy="no-referrer"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
                      />
                      <p className="text-xs text-blue-500">Preview</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: Info cards ── */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Account info */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 font-heading">
              Account information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  icon: TbMail,
                  label: "Email address",
                  value: user?.email,
                  color: "text-blue-500",
                  bg: "bg-blue-50",
                },
                {
                  icon: TbShield,
                  label: "Account role",
                  value: user?.role
                    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    : "",
                  color: "text-violet-500",
                  bg: "bg-violet-50",
                },
                {
                  icon: TbCalendar,
                  label: "Member since",
                  value: formatDate(user?.createdAt),
                  color: "text-emerald-500",
                  bg: "bg-emerald-50",
                },
                {
                  icon: TbUser,
                  label: "Account type",
                  value: user?.isGoogleUser
                    ? "Google OAuth"
                    : "Email & Password",
                  color: "text-amber-500",
                  bg: "bg-amber-50",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100/70 transition-colors"
                >
                  <div className={`p-2 rounded-xl ${item.bg} flex-shrink-0`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Security card */}
          {!user?.isGoogleUser && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-1 font-heading">
                Account security
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Your account is secured with email and password authentication.
              </p>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <TbShield className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <p className="text-sm text-emerald-700">
                  Password authentication is active. To change your password,
                  please contact support.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
