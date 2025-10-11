"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
    User,
    Briefcase,
    BarChart3,
    CalendarCheck,
    Mail,
    Zap,
    Download,
    Shield,
    Search,
    AlertTriangle,
    Edit3,
    Monitor,
    Info,
    Home,
    Library,
    Folder,
    Settings,
    Users,
    Clock,
    Bell,
    Bot,
    FileText,
    Receipt,
    MessageCircle,
    MapPin
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "../../../contexts/ThemeContext";

interface NavigationItem {
    title: string;
    id: string;
    icon: any;
    href?: string;
}

const navigationItems: Record<string, NavigationItem[]> = {
    Career: [
        { title: "Mission", id: "hero", icon: User },
        { title: "Studios", id: "studios", icon: Briefcase },
        { title: "Skills", id: "skills", icon: BarChart3 },
        { title: "Action Plan", id: "plan", icon: CalendarCheck },
        { title: "Contact", id: "contact", icon: Mail },
    ],
    SWOT: [
        { title: "Overview", id: "swot-hero", icon: Shield },
        { title: "Matrix", id: "swot-matrix", icon: BarChart3 },
        { title: "Action Plan", id: "swot-action", icon: CalendarCheck },
    ],
    Nemesis: [
        { title: "Intro", id: "nemesis-hero", icon: Zap },
        { title: "Research", id: "nemesis-research", icon: Search },
        { title: "Problems", id: "nemesis-problems-solutions", icon: AlertTriangle },
        { title: "Sketches", id: "nemesis-sketches", icon: Edit3 },
        { title: "Digital", id: "nemesis-digital", icon: Monitor },
        { title: "Credits", id: "nemesis-credits", icon: Info },
    ],
    QuoteFast: [
        { title: "Dashboard", id: "dashboard", icon: Home, href: "/dashboard" },
        { title: "AI Features", id: "features", icon: Bot },
        { title: "Performance", id: "stats", icon: BarChart3 },
        { title: "Demo", id: "demo", icon: Monitor },
    ]
};

interface AdvancedLayoutProps {
    children: React.ReactNode;
    currentPageName?: string;
    show3DBackground?: boolean;
    enableCustomCursor?: boolean;
    enablePrint?: boolean;
}

export default function AdvancedLayout({ 
    children, 
    currentPageName = 'QuoteFast',
    show3DBackground = false,
    enableCustomCursor = true,
    enablePrint = true
}: AdvancedLayoutProps) {
    const [activeSection, setActiveSection] = useState('dashboard');
    const { theme } = useTheme();
    const observer = useRef<IntersectionObserver | null>(null);

    const currentNavItems = navigationItems[currentPageName as keyof typeof navigationItems] || navigationItems.QuoteFast;

    useEffect(() => {
        if (typeof window === 'undefined') return;

        observer.current = new IntersectionObserver((entries) => {
            const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
            if (visibleSection) {
                setActiveSection(visibleSection.id);
            }
        }, { 
            threshold: 0.3,
            rootMargin: "-30% 0px -30% 0px"
        });

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => {
            if (observer.current) {
                observer.current.observe(section);
            }
        });

        return () => {
            sections.forEach((section) => {
                if (observer.current) {
                    observer.current.unobserve(section);
                }
            });
        };
    }, [children, currentPageName]);

    useEffect(() => {
        if (!enableCustomCursor || typeof window === 'undefined') return;

        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursorDot || !cursorOutline) return;

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;
        let animationId: number;
        let isCleanup = false;

        const handleMouseMove = (e: MouseEvent) => {
            if (isCleanup) return;
            mouseX = e.clientX;
            mouseY = e.clientY;
            (cursorDot as HTMLElement).style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        };

        const animateOutline = () => {
            if (isCleanup) return;
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            (cursorOutline as HTMLElement).style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
            animationId = requestAnimationFrame(animateOutline);
        };

        const handleMouseEnter = () => {
            if (!isCleanup && cursorOutline) {
                cursorOutline.classList.add('hover');
            }
        };

        const handleMouseLeave = () => {
            if (!isCleanup && cursorOutline) {
                cursorOutline.classList.remove('hover');
            }
        };

        const addListeners = () => {
            if (isCleanup) return;
            const elements = document.querySelectorAll('a, button');
            elements.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
                el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
            });
        };

        const removeListeners = () => {
            const elements = document.querySelectorAll('a, button');
            elements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };

        // Throttle mouse move events for better performance
        let throttleTimeout: NodeJS.Timeout;
        const throttledMouseMove = (e: MouseEvent) => {
            if (throttleTimeout) return;
            throttleTimeout = setTimeout(() => {
                handleMouseMove(e);
                throttleTimeout = null as any;
            }, 16); // ~60fps
        };

        window.addEventListener('mousemove', throttledMouseMove, { passive: true });
        animationId = requestAnimationFrame(animateOutline);
        addListeners();

        const mutationObserver = new MutationObserver((mutations) => {
            if (isCleanup) return;
            removeListeners();
            addListeners();
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            isCleanup = true;
            window.removeEventListener('mousemove', throttledMouseMove);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            if (throttleTimeout) {
                clearTimeout(throttleTimeout);
            }
            removeListeners();
            mutationObserver.disconnect();
        };
    }, [enableCustomCursor]);

    const handlePrint = () => {
        if (typeof window !== 'undefined') {
            window.print();
        }
    };

    const isDarkTheme = theme === "dark";

    return (
        <div className={`relative min-h-screen font-sans transition-colors duration-300 ${
            enableCustomCursor ? 'custom-cursor-area' : ''
        } ${
            isDarkTheme 
                ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100' 
                : 'bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 text-gray-900'
        } print:bg-white print:text-black`}>
            
            {/* Custom Cursor */}
            {enableCustomCursor && (
                <>
                    <div className="cursor-dot"></div>
                    <div className="cursor-outline"></div>
                </>
            )}

            {/* 3D Background - Hidden in Print */}
            {show3DBackground && (
                <div className="fixed inset-0 z-0 print:hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-600/10 animate-pulse"></div>
                        
                        {/* Floating geometric shapes */}
                        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-bounce"></div>
                        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-bounce animation-delay-1000"></div>
                        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-blue-400/15 rounded-full blur-xl animate-bounce animation-delay-2000"></div>
                        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-300/20 rounded-full blur-xl animate-bounce animation-delay-500"></div>
                        
                        {/* Grid pattern overlay */}
                        <div className="absolute inset-0 opacity-5 grid-pattern"></div>
                    </div>
                </div>
            )}

            {/* Sidebar - Hidden in Print */}
            <aside className={`fixed inset-y-0 left-0 flex flex-col gap-3 sm:gap-4 py-6 px-3 items-center z-50 print:hidden backdrop-blur-xl border-r transition-all duration-300 ${
                isDarkTheme 
                    ? 'bg-white/10 border-white/20 hover:bg-white/12' 
                    : 'bg-white/90 border-gray-400/60 shadow-lg hover:bg-white/95 hover:shadow-xl'
            }`}>
                <Link 
                    href={currentNavItems[0]?.href || '#'}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-md mb-4 will-change-transform ${
                        isDarkTheme
                            ? 'bg-gray-800/60 hover:bg-gray-700/70 border border-gray-600/40 hover:border-gray-500/60 shadow-lg hover:shadow-xl'
                            : 'bg-gray-100/80 hover:bg-gray-200/90 shadow-sm border border-gray-300/50'
                    }`}
                    aria-label="Go to top"
                >
                    <Zap className={`w-5 h-5 transition-colors duration-300 ${
                        isDarkTheme ? 'text-white hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                    }`} />
                </Link>
                
                {currentNavItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const Component = item.href ? Link : 'a';
                    const props = item.href ? { href: item.href } : { href: `#${item.id}` };
                    
                    return (
                        <Component
                            key={item.title}
                            {...props}
                            title={item.title}
                            aria-label={`Go to ${item.title}`}
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-md will-change-transform ${
                                isActive 
                                    ? isDarkTheme
                                        ? 'bg-blue-600/80 text-white scale-105 shadow-lg border border-blue-500/50'
                                        : 'bg-blue-600 text-white scale-105 shadow-lg'
                                    : isDarkTheme
                                        ? 'bg-gray-800/60 hover:bg-gray-700/70 border border-gray-600/40 hover:border-gray-500/60 shadow-lg hover:shadow-xl'
                                        : 'bg-gray-100/80 hover:bg-gray-200/90 shadow-sm border border-gray-300/50'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                                isActive 
                                    ? 'text-white'
                                    : isDarkTheme 
                                        ? 'text-white hover:text-blue-400' 
                                        : 'text-gray-700 hover:text-blue-600'
                            }`} />
                        </Component>
                    );
                })}

                {enablePrint && (
                    <button
                        onClick={handlePrint}
                        title="Print or Save as PDF"
                        aria-label="Print or save presentation as PDF"
                        className={`w-10 h-10 mt-auto rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-md will-change-transform ${
                            isDarkTheme
                                ? 'bg-gray-800/60 hover:bg-gray-700/70 border border-gray-600/40 hover:border-gray-500/60 shadow-lg hover:shadow-xl'
                                : 'bg-gray-100/80 hover:bg-gray-200/90 shadow-sm border border-gray-300/50'
                        }`}
                    >
                        <Download className={`w-5 h-5 transition-colors duration-300 ${
                            isDarkTheme ? 'text-white hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                        }`} />
                    </button>
                )}
            </aside>
            
            {/* Main Content */}
            <main className={`relative z-10 flex flex-col items-center w-full px-4 custom-scrollbar overflow-y-auto min-h-screen sm:pl-20 md:pl-24 lg:pl-28 print:pl-0 print:px-8 ${
                isDarkTheme ? 'bg-transparent' : 'bg-gradient-to-br from-slate-50/50 via-gray-50/50 to-blue-50/50'
            }`}>
                {children}
            </main>

            <style jsx global>{`
                html {
                    scroll-behavior: smooth;
                    scroll-padding-top: 2rem;
                }
                body, * {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                
                * {
                    box-sizing: border-box;
                    will-change: auto;
                }

                /* Custom Cursor */
                .custom-cursor-area {
                    cursor: none;
                }
                .custom-cursor-area a, .custom-cursor-area button {
                    cursor: none;
                }

                .cursor-dot, .cursor-outline {
                    position: fixed;
                    pointer-events: none;
                    z-index: 9999;
                    will-change: transform;
                    top: 0; left: 0;
                    transform: translate(-50%, -50%);
                }

                .cursor-dot {
                    height: 8px;
                    width: 8px;
                    background-color: #3b82f6;
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
                }

                .cursor-outline {
                    width: 40px;
                    height: 40px;
                    border: 2px solid rgba(59, 130, 246, 0.5);
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }
                .cursor-outline.hover {
                    width: 60px;
                    height: 60px;
                    border-color: rgba(59, 130, 246, 0.8);
                    border-width: 3px;
                    background-color: rgba(59, 130, 246, 0.1);
                }
                
                /* Dark theme cursor */
                .dark .cursor-dot {
                    background-color: #60a5fa;
                    box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
                }
                
                .dark .cursor-outline {
                    border-color: rgba(96, 165, 250, 0.5);
                }
                
                .dark .cursor-outline.hover {
                    border-color: rgba(96, 165, 250, 0.8);
                    background-color: rgba(96, 165, 250, 0.1);
                }

                /* Glass Card Effect */
                .glass-card {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                }
                
                .glass-card:hover {
                    background: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
                }
                
                /* Dark theme glass card - optimized for dashboard colors */
                .dark .glass-card {
                    background: rgba(31, 41, 55, 0.6);
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
                }
                
                .dark .glass-card:hover {
                    background: rgba(31, 41, 55, 0.8);
                    border-color: rgba(75, 85, 99, 0.5);
                    transform: translateY(-2px);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
                }

                /* Lightning Fast Animations */
                .fade-in { 
                    animation: fadeIn 0.4s ease-out forwards;
                    opacity: 0; 
                    transform: translateY(20px);
                    will-change: opacity, transform;
                }
                @keyframes fadeIn { 
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    } 
                }

                .animate-fade-in-fast {
                    animation: fadeInFast 0.3s ease-out forwards;
                }
                @keyframes fadeInFast { 
                    from { 
                        opacity: 0; 
                        transform: translateY(10px);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    } 
                }
                
                @keyframes pulse-heart {
                    0%, 100% {
                        transform: scale(1) rotate(180deg);
                        filter: drop-shadow(0 0 4px rgba(215, 38, 61, 0.5));
                    }
                    50% {
                        transform: scale(1.1) rotate(180deg);
                        filter: drop-shadow(0 0 12px rgba(215, 38, 61, 0.8));
                    }
                }
                .animate-pulse-heart {
                    animation: pulse-heart 3.5s ease-in-out infinite;
                }

                /* Scrollbar */
                .custom-scrollbar {
                    scroll-behavior: smooth;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
                
                /* Dark theme scrollbar */
                .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(75, 85, 99, 0.5); }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(75, 85, 99, 0.7); }

                /* Animation delays for floating shapes */
                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-2000 { animation-delay: 2s; }

                /* Grid pattern for 3D background */
                .grid-pattern {
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                }

                /* Performance Optimizations */
                .glass-card, .hover\\:scale-105, .hover\\:scale-110 {
                    will-change: transform, opacity;
                }
                .will-change-transform {
                    will-change: transform;
                }
                
                section {
                    scroll-margin-top: 4rem;
                }

                /* Ultra Fast Transitions */
                button, a, .glass-card {
                    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                }

                a, button {
                    text-rendering: optimizeLegibility;
                }
                
                h1, h2, h3, h4, h5, h6 {
                    text-rendering: optimizeLegibility;
                }

                /* Print Styles for PDF Export */
                @media print {
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        transition: none !important;
                        animation: none !important;
                    }

                    body {
                        background: white !important;
                        color: black !important;
                    }
                    
                    .custom-cursor-area { cursor: default !important; }
                    .print\\:hidden { display: none !important; }
                    .print\\:static { position: static !important; }
                    .print\\:top-0 { top: 0 !important; }
                    .print\\:right-0 { right: 0 !important; }
                    .print\\:mb-8 { margin-bottom: 2rem !important; }
                    .print\\:pl-0 { padding-left: 0 !important; }
                    .print\\:px-8 { padding-left: 2rem !important; padding-right: 2rem !important; }
                    
                    .glass-card {
                        background: rgba(250, 250, 250, 1) !important;
                        border: 1px solid rgba(0, 0, 0, 0.1) !important;
                        backdrop-filter: none !important;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
                    }

                    h1,h2,h3,h4,h5,h6,p,span,div,svg {
                       color: black !important;
                       opacity: 1 !important;
                    }
                    
                    .text-white, .text-opacity-90, .text-opacity-80, .text-opacity-70, .text-opacity-60, .text-opacity-50, .text-opacity-40, .text-opacity-30 {
                        color: black !important;
                    }
                    .text-opacity-90 { opacity: 0.9 !important; }
                    .text-opacity-80 { opacity: 0.8 !important; }
                    .text-opacity-70 { opacity: 0.7 !important; }
                    .text-opacity-60 { opacity: 0.6 !important; }
                    .text-opacity-50 { opacity: 0.5 !important; }
                    .text-opacity-40 { opacity: 0.4 !important; }
                    .text-opacity-30 { opacity: 0.3 !important; }
                    
                    .bg-white.text-black {
                        background-color: #f0f0f0 !important;
                        color: black !important;
                    }
                    .bg-gradient-to-r {
                        background-image: none !important;
                        color: black !important;
                    }
                    .bg-clip-text {
                        -webkit-background-clip: border-box !important;
                        background-clip: border-box !important;
                        color: black !important;
                    }
                    
                    main {
                        padding: 0 !important;
                    }
                    
                    section {
                        page-break-inside: avoid;
                    }
                    
                    h1, h2, h3, h4, h5, h6 {
                        page-break-after: avoid;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                }
            `}</style>
        </div>
    );
}
