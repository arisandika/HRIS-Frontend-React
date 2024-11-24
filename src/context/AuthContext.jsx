/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext } from "react";

// import Cookies dari 'js-cookie' untuk mengelola cookies
import Cookies from "js-cookie";

// membuat context untuk menyimpan informasi autentikasi
export const AuthContext = createContext();

// membuat provider autentikasi dengan menggunakan context yang telah dibuat sebelumnya
export const AuthProvider = ({ children }) => {
  // membuat useState untuk menyimpan informasi autentikasi
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("token")
  );

  // menggunakan useEffect untuk memastikan perubahan token di cookies
  useEffect(() => {
    // membuat listener untuk perubahan token di cookies
    const handleTokenChange = () => {
      setIsAuthenticated(!!Cookies.get("token"));
    };

    // menambahkan listener pada event 'storage' untuk mendeteksi perubahan token di cookies
    window.addEventListener("storage", handleTokenChange);

    // menghapus listener ketika komponen di-unmount
    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, []);

  // mengembalikan provider autentikasi dengan value yang diambil dari useState
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
