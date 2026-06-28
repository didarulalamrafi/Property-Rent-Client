// src/components/home/TopLocations.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TbMapPin, TbBuildingSkyscraper } from "react-icons/tb";
import { formatCurrency } from "@/lib/utils";
import axiosInstance from "@/lib/axios";

const fallbackLocations = [
  {
    location: "Dhaka",
    count: 120,
    avgPrice: 25000,
    sampleImage:
      "https://images.unsplash.com/photo-1598430772299-8c854b769e68?w=400&q=80",
  },
  {
    location: "Chittagong",
    count: 98,
    avgPrice: 18000,
    sampleImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
  },
  {
    location: "Sylhet",
    count: 76,
    avgPrice: 12000,
    sampleImage:
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&q=80",
  },
  {
    location: "Cox's Bazar",
    count: 65,
    avgPrice: 15000,
    sampleImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
  },
  {
    location: "Rajshahi",
    count: 54,
    avgPrice: 10000,
    sampleImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
  },
  {
    location: "Khulna",
    count: 43,
    avgPrice: 9000,
    sampleImage:
      "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=400&q=80",
  },
];

export default function TopLocations() {
  const [locations, setLocations] = useState(fallbackLocations);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get("/analytics/homepage")
      .then((res) => {
        const locs = res.data.data.topLocations;
        if (locs?.length > 0) {
          setLocations(locs);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLocationClick = (location) => {
    router.push(`/properties?location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 mb-3">
            <TbMapPin className="w-4 h-4" />
            Top Destinations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explore by{" "}
            <span className="gradient-text">Location</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Browse properties in the most popular cities and neighborhoods.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {locations.map((loc, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleLocationClick(loc.location)}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-card hover:shadow-card-hover transition-shadow"
            >
              {/* Image */}
              <img
                src={
                  loc.sampleImage ||
                  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&q=80"
                }
                alt={loc.location}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <p className="text-white font-semibold text-sm">
                  {loc.location}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <TbBuildingSkyscraper className="w-3 h-3 text-violet-300" />
                  <span className="text-violet-200 text-xs">
                    {loc.count} properties
                  </span>
                </div>
                <p className="text-gray-300 text-xs mt-0.5">
                  avg {formatCurrency(loc.avgPrice)}/mo
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}