import React from "react";
import Img from "../assets/istad.png";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import { PiTelegramLogo } from "react-icons/pi";
import { CgMail } from "react-icons/cg";
import imgMindStack from "../assets/mindstack.png";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 py-8 px-4 md:px-8 lg:px-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-200 dark:border-gray-700 pb-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Sponsored and Organized by
            </h3>
            <img
              src={Img}
              alt="iSTAD Logo"
              className="w-40 h-20 object-contain"
            />
            <p className="pt-3 text-sm w-60 text-center">
              Institute of Science and Technology Advance Development
            </p>
          </div>

          {/* Column 2 */}
          <div className="md:pl-10">
            <h3 className="text-blue-600 dark:text-blue-400 text-xl font-bold mb-4">
              About us
            </h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition">
                Blog
              </li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition">
                Career
              </li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition">
                Contact
              </li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition">
                Press
              </li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition">
                Follow Us
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Get in touch With us</h3>
            <div className="flex gap-6 items-center justify-center mb-4">
              <CiFacebook className="text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer" />
              <PiTelegramLogo className="text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer" />
              <CgMail className="text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer" />
              <CiLinkedin className="text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer" />
            </div>
            <form className="max-w-sm mx-auto">
              <input
                type="text"
                placeholder="Write your message here..."
                className="w-full p-3 rounded-2xl border border-gray-300 dark:border-gray-600 
                bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 
                focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </form>
            <p className="text-sm mt-3">
              Write your message here to give recommendations for our website.
            </p>
          </div>

          {/* Column 4 */}
          <div className="md:pl-10 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">Developed by</h3>
            <img
              src={imgMindStack}
              alt="MindStack Logo"
              className="w-28 h-28 object-contain"
            />
            <p className="font-bold">MindStack</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm pt-6 space-y-3 sm:space-y-0">
          <div className="text-gray-500 dark:text-gray-400">
            ©2026 Copyright by MindStack
          </div>
          <div className="flex space-x-4 text-blue-600 dark:text-blue-400">
            <a href="#" className="hover:underline">
              Term of Service
            </a>
            <a href="#" className="hover:underline">
              Cookies Settings
            </a>
            <a href="#" className="hover:underline">
              Privacy Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // ← បន្ថែមបន្ទាត់នេះ