// src/components/Footer.jsx
import React from "react";
import Img from "../assets/istad.png";  
import imgMindStack from "../assets/MindStack.png";
import { CiFacebook } from "react-icons/ci";
import { PiTelegramLogo } from "react-icons/pi";
import { CgMail } from "react-icons/cg";
import { CiLinkedin } from "react-icons/ci";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 py-8 px-4 md:px-8 lg:px-16 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Top section: About, Contact, etc. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-200 dark:border-gray-700 pb-8">
          {/* Column 1: Sponsored & Organized */}
          <div>
            <h3 className="text-black dark:text-gray-100 text-xl font-bold mb-4">
              Sponsored and Organized by
            </h3>
            <img 
              src={Img} 
              alt="ISTAD Logo" 
              className="w-50 h-20 object-contain mb-3" 
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[240px]">
              Institute of Science and Technology Advance Development
            </p>
          </div>
         
          {/* Column 2: About us */}
          <div className="lg:pl-12">
            <h3 className="text-[#3C83F6] text-xl font-bold mb-4">About us</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400 transition">
                  Follow Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Get in touch */}
          <div className="text-center lg:text-left">
            <h3 className="text-black dark:text-gray-100 text-xl font-bold mb-4">
              Get in touch with us
            </h3>
            <div className="flex gap-6 items-center justify-center lg:justify-start mb-4">
              <a href="#" className="hover:opacity-70 transition">
                <CiFacebook className="text-black dark:text-white text-2xl" />
              </a>
              <a href="#" className="hover:opacity-70 transition">
                <PiTelegramLogo className="text-black dark:text-white text-2xl" />
              </a>
              <a href="#" className="hover:opacity-70 transition">
                <CgMail className="text-black dark:text-white text-2xl" />
              </a>
              <a href="#" className="hover:opacity-70 transition">
                <CiLinkedin className="text-black dark:text-white text-2xl" />
              </a>
            </div>
            
            <form className="max-w-sm mx-auto lg:mx-0">   
              <input 
                type="text" 
                className="block w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 dark:placeholder-gray-500" 
                placeholder="Write your message here..." 
                required 
              />
            </form>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 max-w-[280px] mx-auto lg:mx-0">
              Write your message here to get in touch and give recommendations for our website
            </p>
          </div>
          
          {/* Column 4: Development by */}
          <div className="flex flex-col items-center lg:items-end">
            <h3 className="text-black dark:text-gray-100 text-xl font-bold mb-4">
              Development by
            </h3>
            <img 
              src={imgMindStack} 
              alt="MindStack Logo" 
              className="w-28 h-28 object-contain mb-2" 
            />
            <p className="font-bold text-gray-900 dark:text-white">MindStack</p>
          </div>
        </div>
        
        {/* Bottom section: copyright, terms, cookies, privacy */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 pt-6 space-y-3 sm:space-y-0">
          <div>© 2026 Copyright by MindStack</div>
          <div className="flex space-x-6 text-[#3C83F6]">
            <a href="#" className="hover:underline transition">
              Term of Service
            </a>
            <a href="#" className="hover:underline transition">
              Cookies Settings
            </a>
            <a href="#" className="hover:underline transition">
              Privacy Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}