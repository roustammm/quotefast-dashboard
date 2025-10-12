"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Search, Filter, Grid, List, FileText, Image, Video, Music, Archive, Download, Eye, Tag } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

const documents = [
  {
    id: 1,
    name: "Project Requirements.pdf",
    type: "pdf",
    category: "Project Docs",
    size: "2.4 MB",
    uploadDate: "2024-01-10",
    tags: ["requirements", "project", "planning"],
    aiSummary: "Technical specifications and project scope document"
  },
  {
    id: 2,
    name: "Design Mockups.png",
    type: "image",
    category: "Design",
    size: "1.8 MB",
    uploadDate: "2024-01-08",
    tags: ["design", "mockup", "ui"],
    aiSummary: "User interface mockups for mobile application"
  },
  {
    id: 3,
    name: "Team Meeting Notes.docx",
    type: "document",
    category: "Meetings",
    size: "456 KB",
    uploadDate: "2024-01-12",
    tags: ["meeting", "notes", "team"],
    aiSummary: "Weekly team sync meeting notes and action items"
  },
  {
    id: 4,
    name: "Product Demo.mp4",
    type: "video",
    category: "Demos",
    size: "45.2 MB",
    uploadDate: "2024-01-05",
    tags: ["demo", "product", "video"],
    aiSummary: "Product demonstration video for client presentation"
  },
  {
    id: 5,
    name: "Code Guidelines.md",
    type: "document",
    category: "Development",
    size: "123 KB",
    uploadDate: "2024-01-15",
    tags: ["code", "guidelines", "development"],
    aiSummary: "Coding standards and best practices documentation"
  },
  {
    id: 6,
    name: "Brand Assets.zip",
    type: "archive",
    category: "Branding",
    size: "12.3 MB",
    uploadDate: "2024-01-03",
    tags: ["brand", "assets", "logo"],
    aiSummary: "Company branding materials and logo variations"
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-6 w-6 text-red-400" />;
    case "image":
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image className="h-6 w-6 text-green-400" />;
    case "video":
      return <Video className="h-6 w-6 text-purple-400" />;
    case "document":
      return <FileText className="h-6 w-6 text-blue-400" />;
    case "archive":
      return <Archive className="h-6 w-6 text-yellow-400" />;
    default:
      return <FileText className="h-6 w-6 text-gray-400" />;
  }
};

export default function LibraryPage() {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>Library</h1>
          <p className={`${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>Manage documents, guides, and templates</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className={`p-2 rounded-xl transition-colors ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20 border border-white/20"
                : "bg-gray-100/80 hover:bg-gray-200/90 border border-gray-300/50 shadow-sm"
            }`}
            aria-label="Grid view"
          >
            <Grid className="h-4 w-4" />
          </button>
          <button 
            className={`p-2 rounded-xl transition-colors ${
              theme === "dark"
                ? "bg-white/20 border border-white/30"
                : "bg-gray-200/90 border border-gray-400/60 shadow-sm"
            }`}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`} />
          <input
            type="text"
            placeholder="Search documents..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              theme === "dark"
                ? "bg-white/10 border border-white/20 text-white placeholder-gray-400"
                : "bg-gray-100/80 border border-gray-400 text-gray-900 placeholder-gray-600 border-opacity-60"
            }`}
          />
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
          theme === "dark"
            ? "bg-white/10 hover:bg-white/20 border border-white/20"
            : "bg-gray-100/80 hover:bg-gray-200/90 border border-gray-300/50 shadow-sm"
        }`}>
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* AI Summary Card */}
      <Card className={`backdrop-blur-xl ${
        theme === "dark"
          ? "bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-white/20"
          : "bg-gradient-to-r from-green-100/80 to-blue-100/80 border border-gray-400 shadow-md border-opacity-60"
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              theme === "dark" ? "bg-green-400" : "bg-green-500"
            }`}></div>
            AI Library Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            <strong>6 documents</strong> across 4 categories. 
            <strong> Most accessed:</strong> Project Requirements.pdf. 
            <strong> AI detected:</strong> 3 documents need updating based on recent changes.
          </p>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex items-center gap-2 flex-wrap">
        {["All", "Project Docs", "Design", "Meetings", "Development", "Branding", "Demos"].map((category) => (
          <button
            key={category}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              category === "All" 
                ? "bg-blue-600 text-white" 
                : theme === "dark"
                  ? "bg-white/10 hover:bg-white/20 text-gray-300"
                  : "bg-gray-100/80 hover:bg-gray-200/90 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className={`backdrop-blur-xl transition-all duration-300 group ${
            theme === "dark"
              ? "bg-white/10 border border-white/20 hover:bg-white/15"
              : "bg-gray-50/90 border border-gray-400 hover:bg-gray-100/90 shadow-md border-opacity-60"
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(doc.type)}
                  <div className="flex-1 min-w-0">
                    <CardTitle className={`text-sm transition-colors truncate ${
                      theme === "dark"
                        ? "text-white group-hover:text-blue-300"
                        : "text-gray-900 group-hover:text-blue-600"
                    }`}>
                      {doc.name}
                    </CardTitle>
                    <p className={`text-xs mt-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>{doc.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    className={`p-1 rounded-lg transition-colors ${
                      theme === "dark"
                        ? "hover:bg-white/10"
                        : "hover:bg-gray-200/50"
                    }`}
                    aria-label="View document"
                  >
                    <Eye className={`h-4 w-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`} />
                  </button>
                  <button 
                    className={`p-1 rounded-lg transition-colors ${
                      theme === "dark"
                        ? "hover:bg-white/10"
                        : "hover:bg-gray-200/50"
                    }`}
                    aria-label="Download document"
                  >
                    <Download className={`h-4 w-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`} />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* AI Summary */}
              <div className={`rounded-lg p-3 ${
                theme === "dark" ? "bg-white/5" : "bg-gray-100/50"
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    theme === "dark" ? "bg-green-400" : "bg-green-500"
                  }`}></div>
                  <span className={`text-xs font-medium ${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }`}>AI Summary</span>
                </div>
                <p className={`text-xs ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>{doc.aiSummary}</p>
              </div>

              {/* File Info */}
              <div className={`flex items-center justify-between text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <span>{doc.size}</span>
                <span>{new Date(doc.uploadDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'numeric', 
                  day: 'numeric' 
                })}</span>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1 flex-wrap">
                <Tag className={`h-3 w-3 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`} />
                {doc.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className={`text-xs px-2 py-1 rounded-full ${
                    theme === "dark"
                      ? "bg-white/10 text-gray-300"
                      : "bg-gray-200/80 text-gray-700"
                  }`}>
                    {tag}
                  </span>
                ))}
                {doc.tags.length > 2 && (
                  <span className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>+{doc.tags.length - 2}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
