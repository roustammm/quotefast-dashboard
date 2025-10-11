"use client";
import AdvancedLayout from "../components/AdvancedLayout";
import { Card } from "../../../components/ui/card";
import { 
    FileText, 
    Euro, 
    Target, 
    Users, 
    Zap, 
    Bot, 
    TrendingUp, 
    Clock,
    CheckCircle,
    ArrowRight,
    Sparkles,
    BarChart3,
    MessageCircle,
    Mail,
    Receipt
} from "lucide-react";

export default function AdvancedPage() {
    return (
        <AdvancedLayout 
            currentPageName="QuoteFast"
            show3DBackground={true}
            enableCustomCursor={true}
            enablePrint={true}
        >
            <div className="w-full max-w-6xl mx-auto space-y-8 py-8">
                {/* Hero Section */}
                <section id="dashboard" className="min-h-screen flex items-center justify-center">
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="h-8 w-8 text-blue-400" />
                            <span className="text-blue-400 font-semibold">AI Quote Fast</span>
                        </div>
                        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                            Advanced QuoteFast
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Ervaar de volgende generatie van offerte management met AI-powered features, 
                            custom cursors, en glassmorphism effecten.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Nieuwe Offerte
                            </button>
                            <button className="px-6 py-3 border border-gray-400 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Analytics Bekijken
                            </button>
                        </div>
                    </div>
                </section>

                {/* AI Quote Fast Features Section */}
                <section id="features" className="min-h-screen flex items-center">
                    <div className="w-full">
                        <h2 className="text-4xl font-bold text-center mb-4 text-white">AI Quote Fast Features</h2>
                        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                            Ontdek de krachtige AI-aangedreven tools die je offerte proces revolutioneren
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "AI Offerte Generator",
                                    description: "Automatische offerte generatie met AI-powered prijsberekening en content suggesties.",
                                    icon: <Bot className="h-8 w-8 text-blue-400" />,
                                    demo: "Genereer offertes in seconden met AI!",
                                    stats: "45 AI Generaties"
                                },
                                {
                                    title: "Smart Pricing Engine",
                                    description: "Intelligente prijsberekening gebaseerd op marktdata en historische verkoopcijfers.",
                                    icon: <Euro className="h-8 w-8 text-green-400" />,
                                    demo: "Gemiddelde offerte waarde: €2,450",
                                    stats: "€2,450 gem. waarde"
                                },
                                {
                                    title: "Real-time Analytics",
                                    description: "Live dashboard met conversie tracking, klantgedrag en performance metrics.",
                                    icon: <BarChart3 className="h-8 w-8 text-blue-400" />,
                                    demo: "67% acceptatie ratio behaald!",
                                    stats: "67% acceptatie"
                                },
                                {
                                    title: "Custom Cursor Experience",
                                    description: "Interactieve cursor met smooth animaties voor een premium gebruikerservaring.",
                                    icon: <Target className="h-8 w-8 text-orange-400" />,
                                    demo: "Beweeg je muis om de cursor te zien!",
                                    stats: "Premium UX"
                                },
                                {
                                    title: "Glassmorphism Design",
                                    description: "Moderne glas-effecten met backdrop blur voor een professionele uitstraling.",
                                    icon: <Sparkles className="h-8 w-8 text-pink-400" />,
                                    demo: "Deze kaarten hebben glas-effecten!",
                                    stats: "Modern Design"
                                },
                                {
                                    title: "3D Immersive Background",
                                    description: "Animated gradient achtergrond met floating shapes voor een moderne en professionele uitstraling.",
                                    icon: <Zap className="h-8 w-8 text-yellow-400" />,
                                    demo: "Bekijk de animated achtergrond!",
                                    stats: "3D Experience"
                                }
                            ].map((feature, index) => (
                                <Card key={index} className="glass-card p-6 hover:scale-105 transition-all duration-300 group">
                                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                                    <p className="text-gray-300 mb-3">{feature.description}</p>
                                    <div className="text-sm text-blue-400 font-medium mb-2">
                                        📊 {feature.stats}
                                    </div>
                                    <div className="text-sm text-green-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        💡 {feature.demo}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* QuoteFast Performance Stats */}
                <section id="stats" className="min-h-screen flex items-center">
                    <div className="w-full">
                        <h2 className="text-4xl font-bold text-center mb-4 text-white">QuoteFast Performance</h2>
                        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                            Real-time metrics van je AI Quote Fast platform
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { 
                                    label: "Offertes Verstuurd", 
                                    value: "127", 
                                    color: "text-blue-400", 
                                    icon: <FileText className="h-8 w-8" />,
                                    growth: "+24%"
                                },
                                { 
                                    label: "Acceptatie Ratio", 
                                    value: "67%", 
                                    color: "text-green-400", 
                                    icon: <CheckCircle className="h-8 w-8" />,
                                    growth: "+8%"
                                },
                                { 
                                    label: "AI Generaties", 
                                    value: "45", 
                                    color: "text-blue-400", 
                                    icon: <Bot className="h-8 w-8" />,
                                    growth: "+42%"
                                },
                                { 
                                    label: "Gem. Response Tijd", 
                                    value: "1.2s", 
                                    color: "text-orange-400", 
                                    icon: <Clock className="h-8 w-8" />,
                                    growth: "+15%"
                                }
                            ].map((stat, index) => (
                                <Card key={index} className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 group">
                                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300 text-gray-400">
                                        {stat.icon}
                                    </div>
                                    <div className={`text-3xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-300 font-medium mb-1">
                                        {stat.label}
                                    </div>
                                    <div className="text-sm text-green-400 font-semibold">
                                        {stat.growth}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* QuoteFast Interactive Demo */}
                <section id="demo" className="min-h-screen flex items-center">
                    <div className="w-full max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-4 text-white">QuoteFast Interactive Demo</h2>
                        <p className="text-xl text-gray-300 mb-12">
                            Test de geavanceerde AI Quote Fast functionaliteiten
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <Card className="glass-card p-8 hover:scale-105 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <Bot className="h-6 w-6 text-blue-400" />
                                    <h3 className="text-2xl font-bold text-white">AI Offerte Generator</h3>
                                </div>
                                <p className="text-gray-300 mb-6">Test de AI-powered offerte generatie met custom cursor interactie!</p>
                                <div className="space-y-3">
                                    <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                        <Bot className="h-4 w-4" />
                                        Genereer AI Offerte
                                    </button>
                                    <button className="w-full px-6 py-3 border border-gray-400 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        Bekijk Templates
                                    </button>
                                </div>
                            </Card>
                            
                            <Card className="glass-card p-8 hover:scale-105 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <BarChart3 className="h-6 w-6 text-green-400" />
                                    <h3 className="text-2xl font-bold text-white">Real-time Analytics</h3>
                                </div>
                                <p className="text-gray-300 mb-6">Bekijk live metrics met glassmorphism effecten en smooth animaties.</p>
                                <div className="space-y-3">
                                    <div className="p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm border border-white border-opacity-20">
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">Offertes vandaag</span>
                                            <span className="text-green-400 font-bold">12</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white bg-opacity-5 rounded-lg backdrop-blur-sm border border-white border-opacity-10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">Acceptatie ratio</span>
                                            <span className="text-blue-400 font-bold">67%</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        
                        <div className="glass-card p-8 max-w-2xl mx-auto">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Zap className="h-6 w-6 text-blue-400" />
                                <h3 className="text-2xl font-bold text-white">3D Immersive Experience</h3>
                            </div>
                            <p className="text-gray-300 mb-6">
                                De animated gradient achtergrond met floating shapes creëert een professionele en moderne uitstraling voor je QuoteFast platform. 
                                Perfect voor het imponeren van klanten tijdens presentaties.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Start Demo
                                </button>
                                <button className="px-6 py-3 border border-gray-400 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" />
                                    Meer Ontdekken
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AdvancedLayout>
    );
}
