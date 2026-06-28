// src/components/home/TrustedOwners.jsx
"use client";

import { motion } from "framer-motion";
import { Avatar, Chip } from "@heroui/react";
import { TbShieldCheck, TbStar, TbBuildingSkyscraper } from "react-icons/tb";

const trustedOwners = [
  {
    name: "Robert Anderson",
    location: "New York, NY",
    properties: 12,
    rating: 4.9,
    avatar: null,
    badge: "Top Owner",
  },
  {
    name: "Jennifer Lee",
    location: "Los Angeles, CA",
    properties: 8,
    rating: 4.8,
    avatar: null,
    badge: "Verified",
  },
  {
    name: "Michael Torres",
    location: "Miami, FL",
    properties: 15,
    rating: 4.9,
    avatar: null,
    badge: "Top Owner",
  },
  {
    name: "Sophia Chen",
    location: "Chicago, IL",
    properties: 6,
    rating: 4.7,
    avatar: null,
    badge: "Verified",
  },
  {
    name: "James Wilson",
    location: "Seattle, WA",
    properties: 9,
    rating: 4.8,
    avatar: null,
    badge: "Top Owner",
  },
  {
    name: "Olivia Martinez",
    location: "Austin, TX",
    properties: 5,
    rating: 4.6,
    avatar: null,
    badge: "Verified",
  },
];

export default function TrustedOwners() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 mb-3">
            <TbShieldCheck className="w-4 h-4" />
            Verified Owners
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our <span className="gradient-text">Trusted Owners</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Meet our top-rated property owners with verified identities and
            excellent track records.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustedOwners.map((owner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* Avatar with badge */}
              <div className="relative inline-block mb-3">
                <Avatar
                  name={owner.name}
                  size="lg"
                  isBordered
                  color="secondary"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-1 -right-1 bg-violet-500 rounded-full p-0.5">
                  <TbShieldCheck className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Name */}
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-0.5">
                {owner.name}
              </h4>

              {/* Location */}
              <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                {owner.location}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex items-center gap-0.5">
                  <TbStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-medium text-gray-700">
                    {owner.rating}
                  </span>
                </div>
                <span className="text-gray-300">·</span>
                <div className="flex items-center gap-0.5">
                  <TbBuildingSkyscraper className="w-3 h-3 text-violet-400" />
                  <span className="text-xs text-gray-500">
                    {owner.properties}
                  </span>
                </div>
              </div>

              {/* Badge */}
              <Chip
                size="sm"
                variant="flat"
                color={owner.badge === "Top Owner" ? "warning" : "success"}
                className="text-[10px] h-5"
              >
                {owner.badge}
              </Chip>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}