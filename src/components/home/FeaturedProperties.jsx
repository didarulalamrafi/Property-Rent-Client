// src/components/home/FeaturedProperties.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";
import { TbArrowRight, TbSparkles, TbChevronLeft, TbChevronRight } from "react-icons/tb";
import PropertyCard from "@/components/property/PropertyCard";
import { PropertyCardSkeleton } from "@/components/ui/SkeletonCard";
import axiosInstance from "@/lib/axios";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosInstance
      .get("/properties/featured")
      .then((res) => setProperties(res.data.data.properties))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");

    const updateItemsPerPage = (matches) => {
      setItemsPerPage(matches ? 2 : 1);
      setCurrentPage(1);
    };

    updateItemsPerPage(mq.matches);

    const handleChange = (e) => updateItemsPerPage(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const totalPages = Math.ceil(properties.length / itemsPerPage) || 1;

  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <section className="section-padding bg-white">
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 mb-3"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
            >
              <TbSparkles className="w-4 h-4" />
            </motion.span>
            Featured Listings
          </motion.span>
          <h2 className="section-title text-gray-900">
            Handpicked{" "}
            <span className="gradient-text">Properties</span>
          </h2>
          <p className="section-subtitle text-gray-500">
            Explore our top-rated rental properties, carefully selected for
            quality, location, and value.
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <PropertyCardSkeleton />
              </motion.div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-medium">No featured properties found.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {paginatedProperties.map((property) => (
                <motion.div
                  key={property._id}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button
              isIconOnly
              variant="bordered"
              size="sm"
              isDisabled={currentPage === 1}
              onPress={() => handlePageChange(currentPage - 1)}
              className="border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-500"
            >
              <TbChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  size="sm"
                  isIconOnly
                  variant={pageNum === currentPage ? "solid" : "bordered"}
                  className={
                    pageNum === currentPage
                      ? "btn-gradient text-white"
                      : "border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-500"
                  }
                  onPress={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              isIconOnly
              variant="bordered"
              size="sm"
              isDisabled={currentPage === totalPages}
              onPress={() => handlePageChange(currentPage + 1)}
              className="border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-500"
            >
              <TbChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Button
              as={Link}
              href="/properties"
              size="lg"
              endContent={
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                >
                  <TbArrowRight className="w-5 h-5" />
                </motion.span>
              }
              className="font-semibold btn-gradient text-white px-8"
            >
              Show All Properties
            </Button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}