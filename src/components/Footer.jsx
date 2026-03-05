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
import React from "react";
import Img from "../assets/istad.png";  
import { CiFacebook } from "react-icons/ci";
import { PiTelegramLogo } from "react-icons/pi";
import imgMindStack from "../assets/MindStack.png";
import { CgMail } from "react-icons/cg";
import { CiLinkedin } from "react-icons/ci";


const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top section: About, Contact, etc. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700">
          {/* Column 1: Sponsored & Organized, About, Get in touch */}
          <div>
            <h3 className="text-black dark:text-gray-100 text-xl font-bold mb-4">Sponsored and Organized by</h3>
            <img src={Img} alt="iSTAD Logo" className="w-50 h-20 object-contain" />
            <p className="pt-3 text-sm w-60 text-center">Institute of Science and Technology advance Development</p>
          </div>
         
          <div className="pl-20">
            <h3 className="text-[#3C83F6] text-xl font-bold mb-4">About us</h3>
            <ul className="space-y-2 m-4 ">
              <li>
                <p>Blog</p>
              </li>
              <li>
                <p>Career</p>
              </li>
              <li>
                <p>Contact</p>
              </li>
              <li>
                <p>Press</p>
              </li>
              <li>
                <p>Follow Us</p>
              </li>
            
            </ul>
          </div>
{/* change color icon */}
          <div className="text-center">
            <h3 className="text-black dark:text-gray-100 text-xl font-bold mb-4">Get in touch With us</h3>
            <div className="flex gap-8 items-center justify-center">
                <CiFacebook className="text-black dark:text-white text-2xl" />
                <PiTelegramLogo className="text-black dark:text-white text-2xl" />
                <CgMail className="text-black dark:text-white text-2xl" />
                <CiLinkedin className="text-black dark:text-white text-2xl" />   
            </div>
            <form className="max-w-sm mx-auto mt-4">   
                <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">write your message here........</label>
                <div className="relative">
                    <input type="search" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="write your message here........" required />
                </div>
            </form>
             <p className=" text-sm w-67 text-center m-3">Write your message here to get in touch give recommendation our website</p>
          </div>
          
          <div className="pl-20 flex flex-col items-center">
            <h3 className="text-black text-xl font-bold ">Development by</h3>
            <img src={imgMindStack} alt="MindStack Logo" className="w-30 h-30 object-contain" />
            <p className="ml-5 font-bold">MindStack</p>
          </div>
          
        </div>
        {/* Bottom section: copyright, terms, cookies, privacy */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 pt-6 space-y-3 sm:space-y-0">
          <div>@2026 Copy right by MindStack</div>
          <div className="flex space-x-4 text-[#3C83F6]">
            <a href="#" className="hover:text-white transition">
              Term of Service
            </a>
            <a href="#" className="hover:text-white transition">
              Cookies Settings
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy Settings
            </a>
          </div>
        </div>

        {/* Additional note: the "write your message here." appears twice; we kept both as per original */}
      </div>
    </footer>
  );
}