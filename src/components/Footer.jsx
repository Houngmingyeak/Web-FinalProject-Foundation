import React from "react";
import Img from "../assets/istad.png";  
import { CiFacebook } from "react-icons/ci";
import { PiTelegramLogo } from "react-icons/pi";
import imgMindStack from "../assets/MindStack.png";
import { CgMail } from "react-icons/cg";
import { CiLinkedin } from "react-icons/ci";


const Footer = () => {
  return (
    <footer className="bg-white text-black py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top section: About, Contact, etc. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-700">
          {/* Column 1: Sponsored & Organized, About, Get in touch */}
          <div>
            <h3 className="text-black text-xl font-bold mb-4">Sponsored and Organized by</h3>
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
            <h3 className="text-black text-xl font-bold mb-4">Get in touch With us</h3>
            <div className="flex gap-8 items-center justify-center">
                <CiFacebook className="text-black text-2xl" />
                <PiTelegramLogo className="text-black text-2xl" />
                <CgMail className="text-black text-2xl" />
                <CiLinkedin className="text-black text-2xl" />   
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
};

export default Footer;