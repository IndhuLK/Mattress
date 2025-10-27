import React from 'react'
import { Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-[#4f3b30] py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0">
        
        {/* 🧭 NEED HELP SECTION */}
        <div>
          <h3 className="font-bold mb-4 text-sm tracking-wide">
            NEED HELP? HAVE QUESTIONS?
          </h3>
          <div className="flex items-center gap-2 mb-3 text-gray-700 font-semibold hover:text-[#3d5f12]">
            <Phone className="w-4 h-4" />
            <span className="text-sm ">+91 987654321</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-semibold hover:text-[#3d5f12]">
            <Mail className="w-4 h-4" />
            <span className="text-sm ">abc@gmail.com</span>
          </div>
        </div>

        {/* 🛍️ SHOP + COMPANY SECTION */}
        <div className="flex justify-between md:justify-start md:gap-16">
          <div>
            <h3 className="font-bold mb-4 text-sm tracking-wide">SHOP</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><a href="#" className="hover:text-[#3d5f12] font-semibold">Mattress</a></li>
              <li><a href="#" className="hover:text-[#3d5f12] font-semibold">Pillows</a></li>
              <li><a href="#" className="hover:text-[#3d5f12] font-semibold">About Us</a></li>
              <li><a href="#" className="hover:text-[#3d5f12] font-semibold">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm tracking-wide">COMPANY</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li><a href="#" className="hover:text-[#3d5f12] font-semibold">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#3d5f12] font-semibold">Return Policy</a></li>
              <li><a href="#" className="hover:text-[#3d5f12] font-semibold">Shipping Policy</a></li>
            </ul>
          </div>
        </div>

        {/* 🤝 CUSTOMER SERVICE SECTION */}
        <div>
          <h3 className="font-bold mb-4 text-sm tracking-wide">
            CUSTOMER SERVICE
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li><a href="#" className="hover:text-[#3d5f12] font-semibold">My Account</a></li>
            <li><a href="#" className="hover:text-[#3d5f12] font-semibold">Contact Us</a></li>
            <li><a href="#" className="hover:text-[#3d5f12] font-semibold">Orders</a></li>
          </ul>
        </div>
      </div>

      {/* 🔹 Bottom line */}
      <div className="border-t border-gray-200 mt-10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} E-Mattress. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer