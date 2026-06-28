// src/app/(auth)/layout.jsx
import Link from "next/link";
import { TbBuildingEstate } from "react-icons/tb";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white  overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link
            href="/"
            className="flex items-center gap-2 mb-8 lg:hidden"
          >
            <div className="p-2 bg-blue-50 rounded-xl">
              <TbBuildingEstate className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white font-heading">
              RentEasy
            </span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}