"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Chip } from "@heroui/react";
import {
  TbSearch,
  TbX,
  TbAdjustmentsHorizontal,
  TbRefresh,
} from "react-icons/tb";
import PropertyCard from "./PropertyCard";
import PropertyFilters from "./PropertyFilters";
import { PropertyCardSkeleton } from "@/components/ui/SkeletonCard";
import EmptyState from "@/components/ui/EmptyState";
import axiosInstance from "@/lib/axios";
import { debounce } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
];

export default function AllPropertiesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 1,
  });
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "newest",
    page: parseInt(searchParams.get("page")) || 1,
  });

  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      location: searchParams.get("location") || "",
      propertyType: searchParams.get("propertyType") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "newest",
      page: parseInt(searchParams.get("page")) || 1,
    });
  }, [searchParams]);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) params.append(k, v);
      });
      params.set("limit", "9");
      const res = await axiosInstance.get(`/properties?${params}`);
      setProperties(res.data.data.properties);
      setPagination(res.data.data.pagination);
    } catch {
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v !== "" && v !== null && v !== undefined && v !== 1)
        params.set(k, v);
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handlePageChange = (page) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    updateURL(newFilters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const debouncedSearch = useCallback(
    debounce((value) => handleFilterChange("search", value), 500),
    [filters],
  );

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  const clearFilters = () => {
    const reset = {
      search: "",
      location: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      sort: "newest",
      page: 1,
    };
    setFilters(reset);
    setSearchInput("");
    router.push(pathname);
  };

  const hasActiveFilters =
    filters.location ||
    filters.propertyType ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.search;
  const activeFilterCount = [
    filters.location,
    filters.propertyType,
    filters.minPrice,
    filters.maxPrice,
    filters.search,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Page header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900 font-heading mb-1">
            All Properties
          </h1>
          <p className="text-sm text-gray-400">
            {loading
              ? "Loading..."
              : `${pagination.total} properties available`}
          </p>
        </div>

        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <TbSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, location, or description..."
              value={searchInput}
              onChange={handleSearchInput}
              className="w-full pl-10 pr-9 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput("");
                  handleFilterChange("search", "");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <TbX className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort + Filter */}
          <div className="flex gap-2">
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white text-gray-700 focus:outline-none focus:border-blue-400 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters((p) => !p)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-all ${
                showFilters
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              <TbAdjustmentsHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span
                  className={`text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold ${
                    showFilters
                      ? "bg-white/20 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {filters.search && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-blue-50 text-blue-700">
                Search: {filters.search}
                <button
                  onClick={() => {
                    setSearchInput("");
                    handleFilterChange("search", "");
                  }}
                >
                  <TbX className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-blue-50 text-blue-700">
                Location: {filters.location}
                <button onClick={() => handleFilterChange("location", "")}>
                  <TbX className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.propertyType && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-blue-50 text-blue-700">
                Type: {filters.propertyType}
                <button onClick={() => handleFilterChange("propertyType", "")}>
                  <TbX className="w-3 h-3" />
                </button>
              </span>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-blue-50 text-blue-700">
                Price: ${filters.minPrice || "0"} — ${filters.maxPrice || "∞"}
                <button
                  onClick={() => {
                    handleFilterChange("minPrice", "");
                    handleFilterChange("maxPrice", "");
                  }}
                >
                  <TbX className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium px-2 py-1.5"
            >
              <TbRefresh className="w-3 h-3" />
              Clear all
            </button>
          </div>
        )}

        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-5"
            >
              <div className="bg-white border border-gray-100 rounded-2xl">
                <PropertyFilters
                  filters={filters}
                  onChange={handleFilterChange}
                  onClear={clearFilters}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <EmptyState
            type="search"
            title="No properties found"
            description="No properties match your current filters. Try adjusting your search criteria."
            actionLabel="Clear filters"
            onAction={clearFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {properties.map((property, i) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              disabled={filters.page <= 1}
              onClick={() => handlePageChange(filters.page - 1)}
              className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl text-gray-600 hover:border-blue-300 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === pagination.pages ||
                    Math.abs(p - filters.page) <= 1,
                )
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, i) =>
                  item === "..." ? (
                    <span key={`e-${i}`} className="px-2 text-gray-400 text-sm">
                      ...
                    </span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => handlePageChange(item)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                        item === filters.page
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100 bg-white border border-gray-200"
                      }`}
                    >
                      {item}
                    </button>
                  ),
                )}
            </div>

            <button
              disabled={filters.page >= pagination.pages}
              onClick={() => handlePageChange(filters.page + 1)}
              className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl text-gray-600 hover:border-blue-300 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
