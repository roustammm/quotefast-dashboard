// app/dashboard/ai-coding/page.tsx

import { Metadata } from 'next';
import GLMCodingAssistant from '@/components/GLMCodingAssistant';

export const metadata: Metadata = {
  title: 'AI Coding Assistant | QuoteFast Dashboard',
  description: 'GLM 4.6 powered coding assistant for code generation, refactoring, debugging, and more.',
};

export default function AICodingPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Coding Assistant
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Powered by GLM 4.6 - Your intelligent coding companion for development tasks
        </p>
      </div>
      
      <GLMCodingAssistant />
    </div>
  );
}