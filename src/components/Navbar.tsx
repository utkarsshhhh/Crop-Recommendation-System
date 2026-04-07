import React from "react";
import { Sprout, Github, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Dashboard", href: "#dashboard" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`relative glass rounded-[2rem] transition-all duration-500 border border-white/40 shadow-2xl ${
            isScrolled ? "px-6 py-3 shadow-stone-200/40" : "px-8 py-5 shadow-stone-200/20"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#dashboard" className="flex items-center gap-4 group">
              <div className="w-10 h-10 bg-brand-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200 transition-transform group-hover:rotate-12">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-stone-900 tracking-tight leading-none">Crop Recommendation System</h1>
                <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mt-1">Precision Intelligence</p>
              </div>
            </a>

            {/* Navigation Links - Open Section Layout */}
            <nav className="flex-1 flex items-center justify-center gap-2 sm:gap-4 lg:gap-8 max-w-3xl mx-auto">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex-1 text-center py-2 px-3 sm:px-4 rounded-xl text-[9px] sm:text-[10px] font-black text-stone-500 uppercase tracking-widest hover:text-brand-600 hover:bg-stone-50 transition-all relative group whitespace-nowrap border border-transparent hover:border-stone-100"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-600 transition-all group-hover:w-1/2" />
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4 ml-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <button className="px-6 py-2.5 bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-stone-200 flex items-center gap-2 group">
                Portal
                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
