"use client";
import React from "react";
import { Linkedin, Github } from "lucide-react";
import Link from "next/link";

interface DeveloperSectionProps {
  isDarkTheme: boolean;
}

const DeveloperSection: React.FC<DeveloperSectionProps> = ({ isDarkTheme }) => {
  console.log('DeveloperSection isDarkTheme:', isDarkTheme);
  
  return (
    <section
      id="developer"
      className={`py-16 md:py-24 px-6 relative overflow-hidden transition-colors duration-500 ${
        isDarkTheme 
          ? "!bg-black" 
          : "!bg-slate-50"
      }`}
      style={{
        backgroundColor: isDarkTheme ? '#000000' : '#f8fafc'
      }}
    >
      {/* Gradient Orbs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none ${
        isDarkTheme 
          ? 'bg-purple-600/30' 
          : 'bg-[#7c5cfc]/5'
      }`}></div>
      <div className={`absolute top-[20%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none ${
        isDarkTheme 
          ? 'bg-blue-600/20' 
          : 'bg-blue-500/5'
      }`}></div>
      <div className="max-w-5xl mx-auto">
        <div
          className={`rounded-[32px] md:rounded-[40px] p-8 md:p-20 flex flex-col md:flex-row items-center gap-12 md:gap-16 relative overflow-hidden shadow-xl transition-colors duration-500 ${
            isDarkTheme 
              ? "!bg-gray-900 !border-gray-700 border border-slate-200" 
              : "!bg-white !border-slate-200 border border-slate-200"
          }`}
          style={{
            backgroundColor: isDarkTheme ? '#111827' : '#ffffff',
            borderColor: isDarkTheme ? '#374151' : '#e2e8f0'
          }}
        >
          <div className={`absolute top-0 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full blur-[60px] md:blur-[80px] -translate-y-1/3 translate-x-1/3 pointer-events-none ${
            isDarkTheme
              ? "bg-gradient-to-bl from-blue-900/20 to-purple-900/10"
              : "bg-gradient-to-bl from-blue-100/50 to-[#7c5cfc]/5"
          }`}></div>
          <div className="relative shrink-0 z-10 w-full md:w-auto flex justify-center">
            <div className="w-32 h-32 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-slate-100">
              <img
                src="/images/bhagya.jpg"
                alt="Bhagya N. Patel"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute -bottom-1 md:-bottom-2 left-1/2 -translate-x-1/2 md:translate-x-0 md:right-4 bg-slate-900 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full font-bold text-[8px] md:text-[10px] uppercase tracking-wider shadow-xl border border-slate-700 ${
                isDarkTheme ? "border-gray-700" : "border-slate-700"
              }`}
            >
              Creator
            </div>
          </div>
          <div className="text-center md:text-left flex-1 relative z-10">
            <h3
              className={`text-2xl md:text-4xl font-black mb-1 md:mb-2 text-slate-900 tracking-tight ${
                isDarkTheme ? "text-white" : "text-black"
              }`}
            >
              Bhagya N. Patel
            </h3>
            <p
              className={`text-[#7c5cfc] font-bold text-xs md:text-sm mb-4 md:mb-6 uppercase tracking-wide ${
                isDarkTheme ? "text-purple-300" : "text-purple-700"
              }`}
            >
              Software Architect
            </p>
            <p
              className={`text-slate-600 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg ${
                isDarkTheme ? "text-gray-300" : "text-slate-600"
              }`}
            >
              Passionate about building highly scalable tools with unparalleled developer
              experience. Let's create something extraordinary together.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Link
                href="https://www.linkedin.com/in/bhagyapatel"
                className={`p-3 rounded-full transition-all border ${
                  isDarkTheme
                    ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-blue-900/30 hover:text-blue-400 hover:border-blue-700"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Linkedin size={18} />
              </Link>
              <Link
                href="https://github.com/Bhagya2005"
                className={`p-3 rounded-full transition-all border ${
                  isDarkTheme
                    ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <Github size={18} />
              </Link>
              <Link
                href="mailto:bhagya20052904@gmail.com"
                className={`px-6 md:px-8 py-2.5 md:py-3.5 rounded-full text-xs md:text-sm font-bold shadow-md transition-all flex items-center gap-2 border ${
                  isDarkTheme
                    ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:shadow-lg"
                    : "bg-slate-900 text-white border-slate-700 hover:bg-slate-800 hover:shadow-lg"
                }`}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
