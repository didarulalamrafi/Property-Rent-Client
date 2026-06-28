// src/components/home/Banner.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import {
  TbSearch,
  TbMapPin,
  TbBuildingSkyscraper,
  TbCurrencyDollar,
  TbArrowRight,
  TbStar,
  TbShieldCheck,
  TbHome,
} from "react-icons/tb";

const propertyTypes = [
  "Apartment", "House", "Villa", "Studio",
  "Condo", "Townhouse", "Office", "Warehouse",
];

const stats = [
  { value: "10K+", label: "Properties", icon: TbHome },
  { value: "50K+", label: "Happy Tenants", icon: TbStar },
  { value: "99%", label: "Verified Owners", icon: TbShieldCheck },
];

export default function Banner() {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.location) params.append("location", searchData.location);
    if (searchData.propertyType) params.append("propertyType", searchData.propertyType);
    if (searchData.minPrice) params.append("minPrice", searchData.minPrice);
    if (searchData.maxPrice) params.append("maxPrice", searchData.maxPrice);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8f7ff]">
      
      {/* Background Image with light overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')`,
        }}
      >
        {/* Left-to-right fade: opaque white on left, transparent on right */}
        <div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80')`,
  }}
>
  {/* Left: solid white so text is readable, fades to transparent on right */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(to right, rgba(248,247,255,1) 0%, rgba(248,247,255,0.95) 30%, rgba(248,247,255,0.6) 55%, rgba(248,247,255,0) 100%)",
    }}
  />
</div>
        {/* Bottom fade */}
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(248,247,255,0.7) 0%, transparent 40%)"
          }}
        />
      </div>

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.09, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-purple-400"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.09, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-400"
        />
      </div>

      <div className="relative z-10 section-container w-full py-24 md:py-32">
        <div className="max-w-4xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight font-heading mb-6"
          >
            Find Your{" "}
            <span className="gradient-text">Dream</span>
            <br />
            Home and Book now
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl leading-relaxed"
          >
            Find thousands of verified rental properties across Bangladesh.
            From budget-friendly studios to premium villas your ideal home is just one click away.
          </motion.p>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl p-5 border border-indigo-100"
              style={{ boxShadow: "0 4px 40px rgba(108,99,255,0.10)" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1 tracking-wide">
                    LOCATION
                  </label>
                  <div className="relative">
                    <TbMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 z-10" />
                    <input
                      type="text"
                      placeholder="City, neighborhood..."
                      value={searchData.location}
                      onChange={(e) => setSearchData((p) => ({ ...p, location: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1 tracking-wide">
                    PROPERTY TYPE
                  </label>
                  <div className="relative">
                    <TbBuildingSkyscraper className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 z-10" />
                    <select
                      value={searchData.propertyType}
                      onChange={(e) => setSearchData((p) => ({ ...p, propertyType: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 appearance-none"
                    >
                      <option value="">All Types</option>
                      {propertyTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Min Price */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1 tracking-wide">
                    MIN PRICE
                  </label>
                  <div className="relative">
                    <TbCurrencyDollar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 z-10" />
                    <input
                      type="number"
                      placeholder="Min rent"
                      min="0"
                      value={searchData.minPrice}
                      onChange={(e) => setSearchData((p) => ({ ...p, minPrice: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-1.5 ml-1 tracking-wide">
                    MAX PRICE
                  </label>
                  <div className="relative">
                    <TbCurrencyDollar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 z-10" />
                    <input
                      type="number"
                      placeholder="Max rent"
                      min="0"
                      value={searchData.maxPrice}
                      onChange={(e) => setSearchData((p) => ({ ...p, maxPrice: e.target.value }))}
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-3">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  endContent={<TbArrowRight className="w-5 h-5" />}
                  className="font-bold btn-gradient text-white h-12 text-base"
                >
                  <TbSearch className="w-5 h-5 mr-1" />
                  Search Properties
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}