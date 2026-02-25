import React from 'react';
import { Facebook, Send, Mail, Linkedin } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="w-full bg-white pt-16 pb-8 px-6 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 items-start text-left">
        {/* Section 1: ISTAD Branding */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">
            Sponsored and Organized by
          </h3>
          <div className="flex items-center space-x-3">
            {/* Logo placeholder - replace src with your ISTAD logo path later */}
            <img src="" alt="" className="w-14 h-14 object-contain" />
            <span className="text-4xl font-extrabold text-[#1a2e5a] tracking-tighter">
              ISTAD
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium leading-snug">
            Institute of Science and Technology
            <br /> Advance Development
          </p>
        </div>

        {/* Section 2: Navigation Links */}
        <div className="space-y-4">
          <h3 className="font-bold text-blue-500 text-lg">About us</h3>
          <ul className="space-y-3 text-gray-600 text-sm font-medium">
            <li>
              <a href="#" className="hover:text-blue-500">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Follow Us
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact & Input */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">
            Get in touch with us
          </h3>
          <div className="flex space-x-5 text-gray-600">
            <Facebook 
              size={22}
              className="cursor-pointer hover:text-blue-600"
            />
            <Send size={22} className="cursor-pointer hover:text-blue-400" />
            <Mail size={22} className="cursor-pointer hover:text-red-500" />
            <Linkedin
              size={22}
              className="cursor-pointer hover:text-blue-700"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="write your message here ......."
              className="w-full border border-blue-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition"
            />
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Write your message here to get in touch
            <br />
            give recommendation our website
          </p>
        </div>

        {/* Section 4: MindStack Branding */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <h3 className="font-bold text-gray-900 text-lg">Development by</h3>
          {/* Logo placeholder - replace src with your MindStack logo path later */}
          <img src="" alt="" className="w-20 h-20 object-contain" />
          <span className="font-bold text-2xl text-black">MindStack</span>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mt-16 pt-6 border-t border-gray-100 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 space-y-4 md:space-y-0">
        <p>@2026 Copy right by MindStack</p>
        <div className="flex space-x-6 font-medium text-blue-500">
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
    </footer>
  );
}
