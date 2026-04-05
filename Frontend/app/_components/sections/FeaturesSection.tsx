"use client";
import React from "react";
import {
  MousePointer2,
  Zap,
  Layout,
  ExternalLink,
  MapPin,
  Cpu,
} from "lucide-react";

interface FeaturesSectionProps {
  isDarkTheme: boolean;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ isDarkTheme }) => {
  console.log('FeaturesSection isDarkTheme:', isDarkTheme);
  
  const features = [
    {
      i: <MousePointer2 size={24} />,
      t: "No-Code Editor",
      d: "A visual interface tailored for marketers and business owners. Manage pins without engineering help.",
    },
    {
      i: <Zap size={24} />,
      t: "Real-Time Sync",
      d: "Updates in the dashboard instantly apply across all websites where your map is currently embedded.",
    },
    {
      i: <Layout size={24} />,
      t: "Brand Aesthetics",
      d: "Escape the generic map look. Fully customize pin colors and styling to align with your brand system.",
    },
    {
      i: <ExternalLink size={24} />,
      t: "Convert Traffic",
      d: "Interactive geospatial visualizations keep users engaged longer, reducing bounce rates efficiently.",
    },
    {
      i: <MapPin size={24} />,
      t: "Smart Categorization",
      d: "Effectively group diverse locations—like ATMs vs Branches—using intuitive filtering built-in.",
    },
    {
      i: <Cpu size={24} />,
      t: "Guided Walkthroughs",
      d: "Create sequential automated tours to present specific multi-step routes to your end-users.",
    },
  ];

  return (
    <section
      id="features"
      className={`py-16 md:py-24 px-6  transition-colors duration-500 ${
        isDarkTheme 
          ? "!bg-black" 
          : "!bg-slate-50"
      }`}
      style={{
        backgroundColor: isDarkTheme ? '#111827' : '#f8fafc'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-black mb-4 tracking-tight text-slate-900 ${
              isDarkTheme ? "text-white" : "text-black"
            }`}
          >
            Why MapFlow?
          </h2>
          <p
            className={`text-slate-500 text-base md:text-lg font-medium ${
              isDarkTheme ? "text-gray-300" : "text-slate-500"
            }`}
          >
            Simplifying complex geographical data into manageable assets.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className={`p-8 rounded-[32px] transition-all duration-500 group ${
                isDarkTheme
                  ? "!bg-gray-800 !border-gray-700 border border-slate-200 hover:!border-purple-600"
                  : "!bg-white !border-slate-200 border border-slate-200 hover:border-[#7c5cfc]/30"
              }`}
              style={{
                backgroundColor: isDarkTheme ? '#1f2937' : '#ffffff',
                borderColor: isDarkTheme ? '#374151' : '#e2e8f0'
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center text-[#7c5cfc] mb-6 group-hover:scale-110 transition-transform group-hover:border-[#7c5cfc]/10 ${
                  isDarkTheme
                    ? "bg-gray-700 border-gray-600 group-hover:bg-[#7c5cfc]/10"
                    : "bg-slate-50 border-slate-100 group-hover:bg-[#7c5cfc]/5"
                }`}
              >
                {feat.i}
              </div>
              <h4
                className={`font-bold text-lg mb-3 ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                }`}
                style={{
                  color: isDarkTheme ? '#ffffff' : '#0f172a'
                }}
              >
                {feat.t}
              </h4>
              <p
                className={`text-sm leading-relaxed ${
                  isDarkTheme ? "text-gray-300" : "text-slate-500"
                }`}
                style={{
                  color: isDarkTheme ? '#d1d5db' : '#64748b'
                }}
              >
                {feat.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
