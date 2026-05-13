/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  BarChart3,
  Globe,
  Users,
  Navigation,
  PieChart,
  X,
  Info,
  ChevronRight,
  Linkedin,
  Github,
  Mail,
  FileText,
  ExternalLink
} from "lucide-react";

const PROJECT_CONTENT: Record<string, { title: string; description: string; tags: string[]; highlights: string[] }> = {
  'overview': {
    title: 'Travel Agency Dashboard',
    description: 'A comprehensive conversion analysis platform built in Tableau, processing over 4,000 customer records to identify discrepancies in performance based on key metrics. This project focuses on predictive indicators and revenue optimizing strategies.',
    tags: ['Tableau', 'Predictive Analysis', 'SQL'],
    highlights: ['4,000+ Customer Records', 'Performance Discrepancy Analysis', 'Revenue Optimization']
  },
  'geographic': {
    title: 'Regional Market Analysis',
    description: 'Geographic analysis of product performance and conversion rates. Looking at where leads are being allocated versus where those leads are likely to convert. Telling a story of how investing in the wrong regions with the wrong products is leading to revenue loss.',
    tags: ['Tableau', 'Geospatial Analysis', 'Data Storytelling'],
    highlights: ['Lead Allocation Tracking', 'Conversion Rate Mapping', 'Revenue Loss Identification']
  },
  'demographics': {
    title: 'Demographic Analysis',
    description: 'Looking at conversion rates based on demographic information. Learning where best to invest in lead acquisition based on the given data. Allowing targets for marketing investments to maximize ROI.',
    tags: ['SQL', 'Statistical Modeling', 'Predictive Analysis'],
    highlights: ['Demographic Conversion Tracking', 'Lead Acquisition Strategy', 'ROI Optimization']
  },
  'operations': {
    title: 'Sales Strategy Monitor',
    description: 'Monitoring sales performance based on methodology. Providing the results from number of follow-ups to pitch duration. Indicating to the sales team where their best success rates are coming from.',
    tags: ['Tableau', 'Data Storytelling', 'Business Intelligence'],
    highlights: ['Follow-up Analysis', 'Pitch Duration Tracking', 'Success Rate Optimization']
  }
};

interface ImageCardProps {
  id: string;
  src: string;
  alt: string;
  title: string;
  icon: React.ElementType;
  className?: string;
  isSidebar?: boolean;
  isActive?: boolean;
  onSelect: (id: string) => void;
}

const ImageCard = ({ id, src, alt, title, icon: Icon, className = "shadow-sm border border-gray-200", isSidebar = false, isActive = false, onSelect }: ImageCardProps) => {
  return (
    <div 
      onClick={() => onSelect(id)}
      className={`w-full h-full bg-white relative group overflow-hidden cursor-pointer transition-all duration-500 ${className} ${isActive ? 'ring-2 ring-gray-300 ring-offset-4 ring-offset-gray-50' : ''}`}
    >
      {/* Selection Overlay */}
      <div className={`absolute inset-0 z-30 transition-opacity duration-500 pointer-events-none ${isActive ? 'bg-black/[0.02]' : 'bg-transparent group-hover:bg-black/[0.02]'}`} />
      
      {/* Fallback state shown beneath the image if it doesn't load/exist yet */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50/80 p-6 text-center z-0">
        <Icon size={isSidebar ? 32 : 48} className={`mb-4 transition-colors duration-500 ${isActive ? 'text-gray-500' : 'text-gray-300'}`} />
        <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-500 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>{title}</h3>
      </div>

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`absolute top-[5px] left-0 w-full h-full ${isSidebar ? 'object-cover' : 'object-contain'} object-left-top z-10 transition-all duration-700 ${isActive ? 'scale-100' : 'scale-100 group-hover:scale-[1.02]'}`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.style.opacity = '0';
        }}
        onLoad={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      />

      {/* Tap Indicator */}
      <div className={`absolute bottom-3 right-3 z-30 transition-transform duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100'}`}>
        <div className="bg-white/90 backdrop-blur shadow-md rounded-full p-1.5 border border-gray-100">
          <Info size={14} className={isActive ? 'text-gray-700' : 'text-gray-400'} />
        </div>
      </div>
    </div>
  );
};

const InlineExplanation = ({ activeId, isVisible, isMobile }: { activeId: string; isVisible: boolean; isMobile: boolean }) => {
  const content = PROJECT_CONTENT[activeId];
  if (!content) return null;

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{ 
        x: isVisible ? (isMobile ? 0 : 700) : 0,
        y: isVisible ? (isMobile ? 620 : 0) : 0, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 1.4, ease: [0.5, -0.05, 0.2, 1.05] }}
      className="absolute top-0 left-0 h-full w-[680px] bg-white border border-gray-200 shadow-2xl rounded-[8px] p-6 md:p-12 z-0"
    >
      <div className="h-full flex flex-col justify-center">
        <h4 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 md:mb-8 tracking-tight leading-tight uppercase">
          {content.title}
        </h4>
        
        <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-8 md:mb-10 line-clamp-4 md:line-clamp-none">
          {content.description}
        </p>
        
        <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
          {content.highlights.map(highlight => (
            <div key={highlight} className="flex items-center gap-4 text-gray-600">
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-blue-500" />
              <span className="text-[14px] md:text-lg font-medium tracking-wide uppercase">{highlight}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {content.tags.map(tag => (
            <span key={tag} className="px-4 md:px-5 py-2 md:py-2.5 bg-gray-50 border border-gray-100 text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-gray-400 rounded-lg">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SeparatedDashboard = ({ 
  id,
  chartSrc, 
  chartAlt, 
  chartTitle, 
  chartIcon, 
  isExpanded,
  showPresentation,
  isMobile,
  activeCardId,
  onSelect,
  baseY = 0,
  cardY = 0,
  sidebarOffsetY = 0,
  sidebarOffsetZ = 0
}: { 
  id: string;
  chartSrc: string, 
  chartAlt: string, 
  chartTitle: string, 
  chartIcon: React.ElementType,
  isExpanded: boolean,
  showPresentation: boolean,
  isMobile: boolean,
  activeCardId: string | null,
  onSelect: (id: string) => void,
  baseY?: number,
  cardY?: number,
  sidebarOffsetY?: number,
  sidebarOffsetZ?: number
}) => {
  const isDetached = isExpanded && (sidebarOffsetY !== 0 || sidebarOffsetZ !== 0);
  const isCurrentlyActive = activeCardId === id;
  const isAnyActive = activeCardId !== null;
  const presentationScale = isMobile ? 0.175 : 0.275;
  const originalYOnScreen = baseY * presentationScale;
  
  return (
    <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
      {/* Sidebar Part */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-[220px] z-20"
        style={{ 
          transformStyle: "preserve-3d",
          originY: showPresentation ? 0 : 0.5 
        }}
        animate={{
          x: isAnyActive ? -1500 : (showPresentation ? -340 : 10),
          y: showPresentation ? (originalYOnScreen - cardY) : (isExpanded ? sidebarOffsetY : 0),
          z: 60 + (isExpanded ? sidebarOffsetZ : 0),
          rotateY: 0,
          opacity: isDetached ? 0 : (isCurrentlyActive ? 0 : 1),
          scale: isDetached ? 0.95 : (showPresentation ? 4.25 : 1)
        }}
        transition={{ 
          duration: 1.4, 
          ease: [0.5, -0.05, 0.2, 1.05],
          opacity: { duration: 0.5, delay: isExpanded ? 0.3 : 0 }
        }}
      >
        <ImageCard
          id={`${id}-sidebar`}
          src={`${import.meta.env.BASE_URL}Images/Sidebar a.png`}
          alt="Sidebar Navigation"
          title="Sidebar"
          icon={Navigation}
          isSidebar
          isActive={isCurrentlyActive}
          onSelect={() => onSelect(id)}
          className="rounded-l-[8px] border border-gray-200 shadow-xl"
        />
      </motion.div>

      {/* Content/Chart Part */}
      <motion.div 
        className="absolute top-0 right-0 h-full w-[680px] z-10"
        animate={{
          x: showPresentation ? 350 : 0
        }}
        transition={{ duration: 1.4, ease: [0.5, -0.05, 0.2, 1.05] }}
      >
        {/* The Explanation Card is now nested inside the Chart's wrapper */}
        <InlineExplanation activeId={id} isVisible={isCurrentlyActive} isMobile={isMobile} />

        <ImageCard 
          id={id}
          src={chartSrc} 
          alt={chartAlt} 
          title={chartTitle} 
          icon={chartIcon} 
          isActive={isCurrentlyActive}
          onSelect={onSelect}
          className={`h-full border border-gray-200 transition-all duration-500 shadow-sm ${
            isDetached ? 'rounded-[8px] border-l' : 'rounded-r-[8px] border-l-0'
          }`} 
        />
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCardSelect = (id: string) => {
    if (!showPresentation) return;
    if (id === '') {
      setActiveCardId(null);
      return;
    }
    setActiveCardId(prev => prev === id ? null : id);
  };

  const handleCollapse = () => {
    if (activeCardId !== null) {
      // Step 1: Return to presentation grid
      setActiveCardId(null);
    } else if (showPresentation) {
      // Step 2: Un-flatten back to 3D separated stack
      setShowPresentation(false);
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      // Step 3: Wait 1.2s for the un-flatten to finish, then compact the stack
      timeoutRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 1200);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowWidth(window.innerWidth);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0 1", "0.6 0.5"] 
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [200, -50]);
  const scrollOpacity = 1;

  const getCardAnimation = (index: number) => {
    // Phase 1: Stack Mode (Closed)
    if (!showPresentation) {
      const baseScale = isMobile ? 0.125 : 0.275;
      const stackOffsets = [
        { y: 0, z: 80, scale: 1 },
        { y: 30, z: 20, scale: 0.98 },
        { y: 50, z: -50, scale: 0.96 },
        { y: 80, z: -100, scale: 0.94 }
      ];
      const offset = stackOffsets[index];
      return {
        x: 0,
        y: offset.y * 0.4,
        z: offset.z * 0.4,
        scale: offset.scale * baseScale,
        opacity: 1,
        filter: index === 0 ? "brightness(1) drop-shadow(0 20px 40px rgba(0,0,0,0.2))" : `brightness(${1 - (index * 0.05)}) drop-shadow(0 ${8 + (index * 4)}px ${16 + (index * 8)}px rgba(0,0,0,0.1))`
      };
    }

    // Phase 2: Presentation Mode (Expanded & Flat)
    const basePositions = [ -950, -300, 350, 1000 ];
    
    if (activeCardId === null) {
      const presentationScale = isMobile ? 0.175 : 0.275;
      
      return { 
        x: 0, 
        y: basePositions[index] * presentationScale, 
        z: 0, 
        scale: presentationScale, 
        opacity: 1, 
        filter: "brightness(1) drop-shadow(0 20px 40px rgba(0,0,0,0.15))" 
      };
    }

    // Phase 3: Active Selection Focus
    const order = ['overview', 'geographic', 'demographics', 'operations'];
    const activeIndex = order.indexOf(activeCardId);

    const baseWidth = isMobile ? 680 : 1380; 
    const targetViewportWidth = windowWidth * 0.90; 
    const dynamicScale = targetViewportWidth / baseWidth; 
    const centerX = isMobile ? (-460 * dynamicScale) : (-810 * dynamicScale);
    const activeY = isMobile ? (-310 * dynamicScale) : 0;

    if (index === activeIndex) {
      return { 
        x: centerX, 
        y: activeY, 
        z: 0, 
        scale: dynamicScale,
        opacity: 1,
        // THE FIX: Stripping the filter here breaks the browser's 
        // rasterization lock, forcing a crisp high-resolution render.
        filter: "none",
        zIndex: 50
      };
    } else {
      const presentationScale = isMobile ? 0.175 : 0.275;
      const activeHeight = isMobile ? 1220 : 600;
      const cardHeight = 600;
      const gap = 40;
      
      const basePush = (activeHeight / 2) * dynamicScale + (cardHeight / 2) * presentationScale + gap;
      const offsetMultiplier = Math.abs(index - activeIndex);
      const totalPush = basePush + ((offsetMultiplier - 1) * (cardHeight * presentationScale + gap));
      
      return { 
        x: centerX, 
        y: index < activeIndex ? -totalPush : totalPush, 
        z: 0, 
        scale: presentationScale,
        opacity: 1,
        // Optional: Keep inactive cards slightly dimmed so the active one pops
        filter: "brightness(0.8) drop-shadow(0 10px 20px rgba(0,0,0,0.1))"
      };
    }
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900 w-full overflow-x-hidden">

      {/* SECTION 1: PROFILE / HERO */}
      <section className="min-h-screen flex flex-col justify-center px-4 md:px-8 py-12 border-b border-gray-200">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-4 bg-white shadow-2xl border border-gray-100 rounded-sm p-2 md:p-3 relative group h-fit">
              <div className="overflow-hidden">
                <img 
                  src={`${import.meta.env.BASE_URL}Images/Profile a.jpg`}
                  alt="Isaiah Spann" 
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-105" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            </div>

            <div className="col-span-12 md:col-span-8 bg-white shadow-sm border border-gray-200 rounded p-8 md:p-16 flex flex-col justify-center min-h-[400px]">
              <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-6 tracking-tighter uppercase">Isaiah Spann</h1>
              <p className="text-xl md:text-2xl text-gray-500 font-light mb-12 max-w-2xl leading-relaxed">
                Data Analyst specializing in business intelligence and forecasting. Transforming massive datasets into interactive narrative dashboards that drive retention and ROI.
              </p>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Core Competencies</p>
                <div className="flex flex-wrap gap-3">
                  {['Data Storytelling', 'SQL', 'Tableau', 'Statistical Modeling', 'Predictive Analysis'].map(skill => (
                    <span key={skill} className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-bold uppercase tracking-widest rounded transition-colors hover:bg-white hover:border-blue-200 hover:text-blue-500">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center w-full animate-bounce text-gray-400">
            <button 
              onClick={() => sectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 border border-gray-200 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm cursor-pointer hover:bg-gray-50 hover:text-gray-600 transition-all active:scale-95"
            >
              Dashboard Example
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: DASHBOARD CARD STACK */}
      <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-4 md:px-8 py-24 bg-gray-50 overflow-hidden">
        <motion.div
          style={{ y: scrollY, opacity: scrollOpacity, perspective: 1200 }}
          className="w-full mx-auto flex flex-col items-center justify-center pb-40 relative"
        >
          <AnimatePresence>
          </AnimatePresence>

          <motion.div
            onClick={() => {
              if (!isExpanded) {
                setIsExpanded(true);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                  setShowPresentation(true);
                }, 1000);
              }
            }}
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateX: showPresentation ? 0 : 45,
              rotateZ: showPresentation ? 0 : -15,
              rotateY: showPresentation ? 0 : 5,
            }}
            transition={{ duration: 1.4, ease: [0.5, -0.05, 0.2, 1.05] }}
            className={`w-[900px] h-[600px] relative flex ${showPresentation ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {/* Cards Container */}
            <div className="absolute inset-0 h-full w-full" style={{ transformStyle: "preserve-3d" }}>
              {/* Card 4 (Operations) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{ zIndex: 1, transformStyle: "preserve-3d" }}
                animate={getCardAnimation(3)}
                transition={{ duration: 1.4, ease: [0.5, -0.05, 0.2, 1.05] }}
              >
                <SeparatedDashboard 
                  id="operations"
                  chartSrc={`${import.meta.env.BASE_URL}Images/Operations b.png`}
                  chartAlt="Operational ROI Analytics" 
                  chartTitle="Financial Operations" 
                  chartIcon={PieChart}
                  isExpanded={isExpanded}
                  showPresentation={showPresentation}
                  isMobile={isMobile}
                  activeCardId={activeCardId}
                  onSelect={handleCardSelect}
                  baseY={1000}
                  cardY={getCardAnimation(3).y}
                  sidebarOffsetY={-80}
                  sidebarOffsetZ={180}
                />
              </motion.div>

              {/* Card 3 (Demographics) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{ zIndex: 2, transformStyle: "preserve-3d" }}
                animate={getCardAnimation(2)}
                transition={{ duration: 1.4, ease: [0.5, -0.05, 0.2, 1.05] }}
              >
                <SeparatedDashboard 
                  id="demographics"
                  chartSrc={`${import.meta.env.BASE_URL}Images/Demographics b.png`}
                  chartAlt="Workforce Attrition Metrics" 
                  chartTitle="Labor Analytics" 
                  chartIcon={Users}
                  isExpanded={isExpanded}
                  showPresentation={showPresentation}
                  isMobile={isMobile}
                  activeCardId={activeCardId}
                  onSelect={handleCardSelect}
                  baseY={350}
                  cardY={getCardAnimation(2).y}
                  sidebarOffsetY={-50}
                  sidebarOffsetZ={130}
                />
              </motion.div>

              {/* Card 2 (Geographic) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{ zIndex: 3, transformStyle: "preserve-3d" }}
                animate={getCardAnimation(1)}
                transition={{ duration: 1.4, ease: [0.5, -0.05, 0.2, 1.05] }}
              >
                <SeparatedDashboard 
                  id="geographic"
                  chartSrc={`${import.meta.env.BASE_URL}Images/Geographic b.png`}
                  chartAlt="Regional Penetration Analysis" 
                  chartTitle="Market GIS" 
                  chartIcon={Globe}
                  isExpanded={isExpanded}
                  showPresentation={showPresentation}
                  isMobile={isMobile}
                  activeCardId={activeCardId}
                  onSelect={handleCardSelect}
                  baseY={-300}
                  cardY={getCardAnimation(1).y}
                  sidebarOffsetY={-30}
                  sidebarOffsetZ={60}
                />
              </motion.div>

              {/* Card 1 (Overview) */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                style={{ zIndex: 4, transformStyle: "preserve-3d" }}
                animate={getCardAnimation(0)}
                transition={{ duration: 1.4, ease: [0.5, -0.05, 0.2, 1.05] }}
              >
                <SeparatedDashboard 
                  id="overview"
                  chartSrc={`${import.meta.env.BASE_URL}Images/Overview b.png`}
                  chartAlt="Travel Agency Ecosystem" 
                  chartTitle="Travel Agency Dashboard" 
                  chartIcon={BarChart3}
                  isExpanded={isExpanded}
                  showPresentation={showPresentation}
                  isMobile={isMobile}
                  activeCardId={activeCardId}
                  onSelect={handleCardSelect}
                  baseY={-950}
                  cardY={getCardAnimation(0).y}
                  sidebarOffsetY={0}
                  sidebarOffsetZ={0}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* SECTION 3: CONTACT & EXTERNAL LINKS */}
      <section className="min-h-[60vh] flex flex-col justify-center px-4 md:px-8 py-24 bg-white border-t border-gray-200">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight uppercase">Let's Connect</h2>
            <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Interested in data-driven storytelling or business intelligence? Reach out to discuss how we can transform your data into actionable visual insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a 
              href="https://public.tableau.com/app/profile/isaiah.spann/vizzes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gray-50 border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-sm font-light uppercase tracking-widest text-gray-900 mb-2">Tableau Public</h3>
              <div className="mt-auto flex items-center gap-2 text-blue-500 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ExternalLink size={12} />
              </div>
            </a>

            <a 
              href="https://www.linkedin.com/in/isaiah-spann-08b633321" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gray-50 border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600/5 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Linkedin size={32} />
              </div>
              <h3 className="text-sm font-light uppercase tracking-widest text-gray-900 mb-2">LinkedIn</h3>
              <div className="mt-auto flex items-center gap-2 text-blue-600 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Connect <ExternalLink size={12} />
              </div>
            </a>

            <a 
              href="mailto:isaiah.jspann@gmail.com" 
              className="group bg-gray-50 border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-900/5 text-gray-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail size={32} />
              </div>
              <h3 className="text-sm font-light uppercase tracking-widest text-gray-900 mb-2">Email</h3>
              <div className="mt-auto flex items-center gap-2 text-gray-900 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Send Message <ChevronRight size={12} />
              </div>
            </a>

            <a 
              href="https://github.com/isaiahspann" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-gray-50 border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Github size={32} />
              </div>
              <h3 className="text-sm font-light uppercase tracking-widest text-gray-900 mb-2">GitHub</h3>
              <div className="mt-auto flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                View Source <ExternalLink size={12} />
              </div>
            </a>
          </div>

          <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white text-xs font-bold">IS</div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Isaiah Spann</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
