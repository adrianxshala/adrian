"use client";

import Link from "next/link";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const logout = authContext?.logout;
  const router = useRouter();
  const pathname = usePathname(); // ✅ Correct way to get the current route

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Correctly close the dropdown when navigating to a new page
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-blue-200">Home</Link>
          <Link href="/about" className="hover:text-blue-200">About</Link>
          <Link href="/dashboard" className="hover:text-blue-200">Dashboard</Link>
          <Link href="/cars" className="hover:text-blue-200">Cars</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <span className="text-white cursor-pointer" onClick={toggleDropdown}>
                Welcome, {user?.name || user?.username}!
              </span>

              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                  <ul>
                    <li>
                      <Link href="/profile" className="block px-4 py-2 hover:bg-blue-100" onClick={() => setIsDropdownOpen(false)}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={logout} className="block px-4 py-2 w-full text-left hover:bg-red-100">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
