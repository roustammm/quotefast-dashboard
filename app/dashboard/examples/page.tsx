"use client";
import AdvancedLayout from "../components/AdvancedLayout";
import { Card } from "../../../components/ui/card";
import { useState } from "react";

export default function ExamplesPage() {
    const [show3D, setShow3D] = useState(false);
    const [customCursor, setCustomCursor] = useState(true);
    const [enablePrint, setEnablePrint] = useState(true);

    return (
        <AdvancedLayout 
            currentPageName="Dashboard"
            show3DBackground={show3D}
            enableCustomCursor={customCursor}
            enablePrint={enablePrint}
        >
            <div className="w-full max-w-4xl mx-auto space-y-8 py-8">
                {/* Configuration Panel */}
                <Card className="glass-card p-6">
                    <h2 className="text-2xl font-bold mb-6">Layout Configuration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={show3D}
                                onChange={(e) => setShow3D(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span>3D Background</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={customCursor}
                                onChange={(e) => setCustomCursor(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span>Custom Cursor</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                checked={enablePrint}
                                onChange={(e) => setEnablePrint(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span>Print Support</span>
                        </label>
                    </div>
                </Card>

                {/* Feature Showcase */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card p-6">
                        <h3 className="text-xl font-semibold mb-4">Glassmorphism Cards</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Beautiful glass-like cards with backdrop blur effects.
                        </p>
                        <div className="space-y-2">
                            <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded-full">
                                <div className="h-2 bg-blue-600 rounded-full w-3/4"></div>
                            </div>
                            <div className="h-2 bg-green-200 dark:bg-green-800 rounded-full">
                                <div className="h-2 bg-green-600 rounded-full w-1/2"></div>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-card p-6">
                        <h3 className="text-xl font-semibold mb-4">Interactive Elements</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Hover over buttons and links to see the custom cursor effects.
                        </p>
                        <div className="space-x-2">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                Hover Me
                            </button>
                            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Another Button
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Animation Demo */}
                <Card className="glass-card p-6">
                    <h3 className="text-xl font-semibold mb-4">Smooth Animations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="fade-in p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <h4 className="font-semibold">Fade In</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Smooth fade in effect</p>
                        </div>
                        <div className="animate-fade-in-fast p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <h4 className="font-semibold">Fast Fade</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Quick fade in animation</p>
                        </div>
                        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg hover:scale-105 transition-transform">
                            <h4 className="font-semibold">Hover Scale</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Hover to scale up</p>
                        </div>
                    </div>
                </Card>

                {/* Print Demo */}
                {enablePrint && (
                    <Card className="glass-card p-6">
                        <h3 className="text-xl font-semibold mb-4">Print Support</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            This layout is optimized for printing and PDF export. 
                            Use the print button in the sidebar or Ctrl+P to test.
                        </p>
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
                            <p className="text-sm">
                                <strong>Tip:</strong> Print styles automatically convert the layout to a clean, 
                                black and white format suitable for PDF export.
                            </p>
                        </div>
                    </Card>
                )}
            </div>
        </AdvancedLayout>
    );
}
