// src/components/dashboard/tenant/TenantFavoritesClient.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Tooltip } from "@heroui/react";
import {
  TbHeart,
  TbHeartOff,
  TbExternalLink,
  TbMapPin,
  TbBed,
  TbBath,
  TbRefresh,
  TbStar,
} from "react-icons/tb";
import axiosInstance from "@/lib/axios";
import EmptyState from "@/components/ui/EmptyState";
import { PropertyCardSkeleton } from "@/components/ui/SkeletonCard";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

export default function TenantFavoritesClient() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 1,
  });

  const fetchFavorites = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/favorites?page=${page}&limit=9`);
      setFavorites(res.data.data.favorites || []);
      setPagination(res.data.data.pagination);
    } catch {
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleRemoveFavorite = async (propertyId, favId) => {
    setRemovingId(favId);
    try {
      await axiosInstance.delete(`/favorites/${propertyId}`);
      setFavorites((prev) => prev.filter((f) => f._id !== favId));
      setPagination((p) => ({ ...p, total: p.total - 1 }));
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove favorite");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">
            My Favorites
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {loading
              ? "Loading..."
              : `${pagination.total} saved propert${pagination.total !== 1 ? "ies" : "y"}`}
          </p>
        </div>
        <Button
          variant="flat"
          size="sm"
          startContent={<TbRefresh className="w-4 h-4" />}
          onPress={() => fetchFavorites()}
          className="bg-gray-100 text-gray-600 font-medium"
        >
          Refresh
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <EmptyState
          type="favorites"
          title="No favorites yet"
          description="You haven't saved any properties yet. Browse properties and tap the heart icon to save them here."
          actionLabel="Browse properties"
          actionHref="/properties"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {favorites.map((fav, i) => {
                const property = fav.propertyId;
                if (!property) return null;

                const image =
                  property.images?.[0] ||
                  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80";

                return (
                  <motion.div
                    key={fav._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:border-blue-100 hover:shadow-sm transition-all duration-200"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={image}
                        alt={property.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Hover actions */}
                      <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Tooltip content="Remove from favorites">
                          <button
                            onClick={() =>
                              handleRemoveFavorite(property._id, fav._id)
                            }
                            disabled={removingId === fav._id}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-colors disabled:opacity-50"
                          >
                            {removingId === fav._id ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <TbHeartOff className="w-4 h-4" />
                            )}
                          </button>
                        </Tooltip>
                        <Tooltip content="View property">
                          <Link
                            href={`/properties/${property._id}`}
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition-colors"
                          >
                            <TbExternalLink className="w-4 h-4" />
                          </Link>
                        </Tooltip>
                      </div>

                      {/* Status badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            property.status === "approved"
                              ? "bg-emerald-500 text-white"
                              : "bg-amber-500 text-white"
                          }`}
                        >
                          {property.status}
                        </span>
                      </div>

                      {/* Price overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-bold text-base font-heading">
                          {formatCurrency(property.price)}
                          <span className="text-white/70 text-xs font-normal ml-1">
                            {property.rentType}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 mb-1 font-heading">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                        <TbMapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </div>

                      {/* Specs row */}
                      <div className="flex items-center gap-3 py-2.5 border-t border-gray-50 mb-3">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <TbBed className="w-3.5 h-3.5 text-blue-400" />
                          <span>{property.bedrooms} beds</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <TbBath className="w-3.5 h-3.5 text-blue-400" />
                          <span>{property.bathrooms} baths</span>
                        </div>
                        {property.averageRating > 0 && (
                          <div className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                            <TbStar className="w-3.5 h-3.5 text-amber-400" />
                            <span>{property.averageRating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          as={Link}
                          href={`/properties/${property._id}`}
                          size="sm"
                          className="flex-1 font-semibold bg-blue-600 text-white text-xs hover:bg-blue-700"
                          startContent={
                            <TbExternalLink className="w-3.5 h-3.5" />
                          }
                        >
                          View property
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          isLoading={removingId === fav._id}
                          onPress={() =>
                            handleRemoveFavorite(property._id, fav._id)
                          }
                          className="bg-red-50 text-red-500 hover:bg-red-100"
                        >
                          <TbHeartOff className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                size="sm"
                variant="flat"
                isDisabled={pagination.page <= 1}
                onPress={() => fetchFavorites(pagination.page - 1)}
                className="bg-gray-100 text-gray-600 font-medium"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-400 px-3">
                Page {pagination.page} of {pagination.pages}
              </span>
              <Button
                size="sm"
                isDisabled={pagination.page >= pagination.pages}
                onPress={() => fetchFavorites(pagination.page + 1)}
                className="bg-blue-600 text-white font-medium"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
