import React from "react";
// If you're using a local image, import it like this:
import heroImage from "../assets/Herosection.png";
import { FaArrowRight } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { CiTrophy } from "react-icons/ci";
import { CgMediaLive } from "react-icons/cg";
import { RiShieldLine } from "react-icons/ri";
import { LuGift } from "react-icons/lu";
import { IoCodeSlash } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { GoStarFill } from "react-icons/go";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="bg-slate-50">
      {/* Hero Section with Image */}
      <header className="relative">
        <div className="relative">
          {/* Background Image */}
          <div className="w-full">
            <img
              src={heroImage}
              alt="Developers collaborating"
              className="w-full h-auto object-cover opacity-7"
            />
          </div>
          {/* Text Overlay - Positioned absolutely on top of the image */}
          {/* Text Overlay - Positioned absolutely on top of the image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="font-extrabold text-black leading-tight">
                {/* First Line */}
                <div className="text-[72px] whitespace-nowrap">
                  Where develpoers
                </div>

                {/* Second Line */}
                <div className="text-[72px] whitespace-nowrap bg-[linear-gradient(90deg,rgba(60,131,246,1)_0%,rgba(245,159,10,1)_91%)] bg-clip-text text-transparent">
                  level up together
                </div>
              </h2>

              <p className="text-[20px] text-slate-600 mt-6 max-w-3xl mx-auto">
                The gamified Q&A platform that makes sharing knowledge
                rewarding. Ask questions, earn XP, unlock badges, and climb the
                leaderboard.
              </p>

              <div className="flex gap-4 flex-wrap justify-center items-center mb-12 mt-8">
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition">
                  <Link to="/questions" className="flex items-center gap-2">
                    Start for free
                    <FaArrowRight className="mt-1" />
                  </Link>
                </div>
                <div className="inline-flex items-center gap-2 border border-gray-200 text-black px-8 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition">
                  <a href="#" className="flex items-center gap-2">
                    See how it works
                    <FaAngleRight className="mt-1" />
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8 md:gap-17 flex-wrap justify-center text-center mt-10">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-slate-900">50K+</div>
                  <div className="text-sm text-slate-500">Developers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-slate-900">120K+</div>
                  <div className="text-sm text-slate-500">
                    Questions Answered
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-slate-900">2M+</div>
                  <div className="text-sm text-slate-500">XP Earned</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-slate-900">98%</div>
                  <div className="text-sm text-slate-500">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of your components remain the same... */}
      {/* Features Section */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
          Everything you need to grow
        </h2>
        <p className="text-lg text-slate-600 text-center max-w-[500px] mx-auto mb-12">
          A developer community built with gratification at its core. Every
          action earns rewards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <div className="bg-slate-50 flex-1 items-start flex-col p-8 rounded-xl border border-slate-200 ">
            <div className="flex items-center justify-center bg-blue-100 w-12 h-12 text-white rounded-xl mb-2 hover:bg-blue-200">
              <LuMessageSquare className="text-blue-600 text-[25px] mx-auto" />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-slate-900 mb-3">
                Q&A That Rewards
              </h3>
              <p className="text-slate-600 text-[15px]">
                Ask and answer questions. Every contribution earns XP and
                rewards.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 flex-1 items-start flex-col p-8 rounded-xl border border-slate-200">
            <div className="flex items-center justify-center bg-blue-100 w-12 h-12 text-white rounded-2xl mb-2 hover:bg-blue-200">
              <CiTrophy className="text-blue-600 text-[25px] mx-auto" />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-slate-900 mb-3">
                Leaderboards
              </h3>
              <p className="text-slate-600 text-[15px]">
                Complete globally verified weekly, monthly, and all-time
                rankings.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 flex-1 items-start flex-col p-8 rounded-xl border border-slate-200">
            <div className="flex items-center justify-center bg-blue-100 w-12 h-12 text-white rounded-2xl mb-2 hover:bg-blue-200">
              <CgMediaLive className="text-blue-600 text-[30px] mx-auto" />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-slate-900 mb-3">
                Daily Challenges
              </h3>
              <p className="text-slate-600 text-[15px]">
                Complete daily challenges to earn bonus XP and exclusive badges.
              </p>
            </div>
          </div>

          
          <div className="bg-slate-50 flex-1 items-start flex-col p-8 rounded-xl border border-slate-200">
            <div className="flex items-center justify-center bg-blue-100 w-12 h-12 text-white rounded-2xl mb-2 hover:bg-blue-200">
              <RiShieldLine className="text-blue-600 text-[25px] mx-auto" />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-slate-900 mb-3">
                Level Up System
              </h3>
              <p className="text-slate-600 text-[15px]">
                Progress through 10 levels with unlockable points and perks.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 flex-1 items-start flex-col p-8 rounded-xl border border-slate-200">
            <div className="flex items-center justify-center bg-blue-100 w-12 h-12 text-white rounded-2xl mb-2 hover:bg-blue-200">
              <LuGift className="text-blue-600 text-[25px] mx-auto" />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-slate-900 mb-3">
                Badges & Rewards
              </h3>
              <p className="text-slate-600 text-[15px]">
                Earn gold, silver, and bronze badges for your achievements.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 flex-1 items-start flex-col p-8 rounded-xl border border-slate-200">
            <div className="flex items-center justify-center bg-blue-100 w-12 h-12 text-white rounded-2xl mb-2 hover:bg-blue-200">
              <IoCodeSlash className="text-blue-600 text-[25px] mx-auto" />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-slate-900 mb-3">
                Code-Free Design
              </h3>
              <p className="text-slate-600 text-[15px]">
                Syntax highlighting, markdown support, and code-centric UX.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-8 font-inter">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Three simple steps to start leveling up.
          </p>

          <div className="flex flex-wrap gap-8 justify-center">
            {/* Step 1 */}
            <div className="flex-1 min-w-[250px] text-center p-6">
              <div className="ml-35 flex items-center justify-center bg-blue-100 w-16 h-15 text-white rounded-2xl mb-1">
                <LuMessageSquare className="text-blue-600 text-3xl mx-auto" />
              </div>
              <p className="text-black font-bold">01</p>
              <h3 className="text-xl text-black font-semibold mb-2">
                Ask or Answer
              </h3>
              <p className="text-slate-600">
                Find questions or help others with expert answers. Every
                interaction earns XP.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex-1 min-w-[250px] text-center p-6 ">
              <div className="ml-35 flex items-center justify-center bg-blue-100 w-16 h-15 text-white rounded-2xl mb-2">
                <CiTrophy className="text-blue-600 text-3xl mx-auto" />
              </div>
              <p className="text-black font-bold">02</p>
              <h3 className="text-xl text-black font-semibold mb-2">
                Earn XP & Badges
              </h3>
              <p className="text-slate-600">
                Watch your progress level up. Unlock gold, silver, and bronze
                badges.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex-1 min-w-[250px] text-center p-6 ">
              <div className="ml-35 flex items-center justify-center bg-blue-100 w-16 h-15 text-white rounded-2xl mb-2">
                <LuUsers className="text-blue-600 text-3xl mx-auto" />
              </div>
              <p className="text-black font-bold">03</p>
              <h3 className="text-xl text-black font-semibold mb-2">
                Climb the Ranks
              </h3>
              <p className="text-slate-600">
                Rise through 50 levels and compete on the global leaderboard!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
          What devs are saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-xl border border-slate-200">
            <div className="flex items-center text-yellow-300 space-x-1">
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-disabled"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </div>
            <p className="text-slate-700 my-4">
              "Definitely made me actually enjoy answering questions."
            </p>
            <p className="font-semibold border-t text-slate-900 ">Sarah M.</p>
            <p className="text-sm text-slate-500">Senior Engineer @ Stripe</p>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-xl border border-slate-200">
            <div className="flex items-center text-yellow-300 space-x-1">
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-disabled"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </div>
            <p className=" text-slate-700 my-6">
              "This game is so fun! I've been playing it for a while now."
            </p>
            <p className="font-semibold border-t  text-slate-900">James L.</p>
            <p className="text-sm text-slate-500">Full-Stack Dev</p>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-xl border border-slate-200">
            <div className="flex items-center text-yellow-300 space-x-1">
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-yellow"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg
                className="w-5 h-5 text-fg-disabled"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </div>
            <p className=" text-slate-700 my-4">
              "I love this game! It's so much fun and challenging."
            </p>
            <p className="font-semibold border-t  text-slate-900">Erwin W.</p>
            <p className="text-sm text-slate-500">Tech Lead @ Netflix</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
      <div className="bg-white text-black text-center py-14 px-8 max-w-[1220px] mx-auto border-2 border-slate-200 rounded-2xl my-16">
        <h2 className="text-4xl font-bold mb-4">Ready to level up?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 ">
          Join 50,000+ developers who are already earning XP, unlocking badges,
          and climbing the leaderboard.
        </p>
        <a
          href="#"
          className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold inline-block shadow-md 
                transform transition duration-300 ease-in-out 
                hover:-translate-y-2 hover:drop-shadow-lg"
        >
          Get started → the flow
        </a>
      </div>
      </section>
    </main>
  );
};

export default HomePage;
