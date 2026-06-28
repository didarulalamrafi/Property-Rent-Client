// src/components/home/WhyThikana.jsx
"use client";

import { motion } from "framer-motion";
import {
  TbBuildingSkyscraper,
  TbSearch,
  TbLock,
  TbHeadset,
  TbStar,
  TbMapPin,
  TbQuote,
  TbArrowRight,
  TbHome,
  TbClock,
  TbCheck,
} from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: TbBuildingSkyscraper,
    title: "Verified Properties",
    description:
      "Every property is reviewed and approved by our admin team to ensure authenticity and quality.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: TbSearch,
    title: "Smart Search",
    description:
      "Advanced filters by location, type, price, and amenities help you find exactly what you need.",
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: TbLock,
    title: "Secure Payments",
    description:
      "Powered by Stripe. Your payment data is encrypted and never stored on our servers.",
    color: "from-green-500 to-green-600",
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: TbHeadset,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to help you with any issues.",
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: TbStar,
    title: "Honest Reviews",
    description:
      "Real reviews from verified tenants help you make informed decisions before booking.",
    color: "from-yellow-500 to-yellow-600",
    bg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: TbMapPin,
    title: "Prime Locations",
    description:
      "Properties in the most sought-after neighborhoods across major cities nationwide.",
    color: "from-pink-500 to-pink-600",
    bg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    location: "Modern Downtown Apartment",
    city: "New York",
    review:
      "Thikana made finding my apartment so simple. The platform is intuitive and the properties are exactly as described. Highly recommend!",
    rating: 5,
    verified: true,
    daysAgo: 7,
  },
  {
    name: "Marcus Johnson",
    location: "Luxury Beach Villa",
    city: "Miami",
    review:
      "The booking process was seamless and the owner was very responsive. Found my dream villa at a great price. 10/10 experience!",
    rating: 5,
    verified: true,
    daysAgo: 14,
  },
  {
    name: "Emma Williams",
    location: "City Studio in SoHo",
    city: "Los Angeles",
    review:
      "I was skeptical at first, but Thikana exceeded all expectations. Transparent pricing, verified listings, and excellent support.",
    rating: 5,
    verified: true,
    daysAgo: 21,
  },
  {
    name: "David Park",
    location: "Specialty Family Home",
    city: "Chicago",
    review:
      "Great platform with a huge selection of properties. The filter options save so much time. Will definitely use again for my next move.",
    rating: 5,
    verified: true,
    daysAgo: 30,
  },
];

const destinations = [
  { name: "Beach, Florida", price: "$5,000/mo", image: "/images/beach.jpg" },
  { name: "Austin, Texas", price: "$1,500/mo", image: "/images/austin.jpg" },
  {
    name: "Massachusetts",
    price: "$1,000/mo",
    image: "/images/massachusetts.jpg",
  },
  { name: "Budapest", price: "$1,000/mo", image: "/images/budapest.jpg" },
  { name: "New York, NY", price: "$1,000/mo", image: "/images/newyork.jpg" },
  {
    name: "Chicago, Illinois",
    price: "$1,000/mo",
    image: "/images/chicago.jpg",
  },
];

const recentListings = [
  {
    title: "Modern Downtown Apartment",
    location: "New York, NY",
    price: "$2,800/mo",
    image: "/images/listing1.jpg",
    beds: 2,
    baths: 2,
  },
  {
    title: "Cozy Studio in SoHo",
    location: "Los Angeles, CA",
    price: "$1,800/mo",
    image: "/images/listing2.jpg",
    beds: 1,
    baths: 1,
  },
  {
    title: "Luxury Beach Villa",
    location: "Miami, FL",
    price: "$5,000/mo",
    image: "/images/listing3.jpg",
    beds: 4,
    baths: 3,
  },
  {
    title: "Family Home in Suburbs",
    location: "Chicago, IL",
    price: "$2,200/mo",
    image: "/images/listing4.jpg",
    beds: 3,
    baths: 2,
  },
];

export default function WhyThikana() {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section - Why Thikana */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-blue-50 to-pink-50" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-300 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-300 blur-3xl" />
        </div>

        <div className="relative z-10 section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-sm font-semibold text-violet-600 bg-violet-100 px-4 py-1.5 rounded-full mb-4">
              WHY THIKANA
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              The Smarter Way to <span className="gradient-text">Rent</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              We combine technology, trust, and transparency to make renting as
              simple as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`inline-flex p-4 rounded-2xl ${feature.bg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-sm font-semibold text-violet-600 bg-violet-100 px-4 py-1.5 rounded-full mb-3">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              What Our <span className="gradient-text">Tenants Say</span>
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Real reviews from real tenants. We let our results speak for
              themselves.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h4>
                      {testimonial.verified && (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          <TbCheck className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {testimonial.location} · {testimonial.city}
                    </p>
                    <div className="flex text-yellow-400 text-sm mt-1">
                      {"★".repeat(testimonial.rating)}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {testimonial.daysAgo} days ago
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  <TbQuote className="inline-block w-4 h-4 text-violet-400 mr-1" />
                  {testimonial.review}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-sm font-semibold text-violet-600 bg-violet-100 px-4 py-1.5 rounded-full mb-3">
              TOP DESTINATIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Explore by <span className="gradient-text">Location</span>
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Browse properties in the most popular cities and neighborhoods.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((dest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/5] cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <TbHome className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                  <h4 className="text-white font-bold text-sm group-hover:underline">
                    {dest.name}
                  </h4>
                  <p className="text-white/80 text-sm font-medium">
                    {dest.price}
                  </p>
                  <span className="inline-block text-xs text-white/60 mt-1">
                    Thikana
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Just Listed / Recently Added */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <span className="inline-block text-sm font-semibold text-violet-600 bg-violet-100 px-4 py-1.5 rounded-full mb-3">
                JUST LISTED
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Recently <span className="gradient-text">Added</span>
              </h2>
              <p className="text-gray-500 text-base mt-1">
                Fresh listings added this week. Be the first to discover your
                next home.
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:gap-3 transition-all"
            >
              See All New <TbArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentListings.map((listing, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative aspect-[16/10] bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TbHome className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    New
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-1">
                    {listing.title}
                  </h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <TbMapPin className="w-4 h-4" />
                    {listing.location}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                    <span>{listing.beds} beds</span>
                    <span>{listing.baths} baths</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-violet-600">
                      {listing.price}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <TbClock className="w-3.5 h-3.5" />
                      2 days ago
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-violet-600 via-blue-600 to-pink-600">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-violet-100 text-lg max-w-xl mx-auto mb-8">
              Join thousands of satisfied tenants and property owners today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/properties"
                className="px-8 py-4 bg-white text-violet-600 font-bold rounded-xl hover:bg-violet-50 transition-all shadow-lg hover:shadow-xl"
              >
                Browse Properties
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 bg-white/20 border border-white/30 text-white font-bold rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(to right, #7c3aed, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
      `}</style>
    </div>
  );
}