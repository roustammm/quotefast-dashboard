"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Bell, Search, Filter, Star, ExternalLink, Calendar, User, Tag, AlertCircle, CheckCircle, Info } from "lucide-react";

const updates = [
  {
    id: 1,
    title: "New AI Analysis Features Released",
    type: "feature",
    priority: "high",
    date: "2024-01-15",
    author: "Development Team",
    description: "Added advanced AI analysis capabilities for project insights and team workload optimization.",
    tags: ["AI", "Features", "Analysis"],
    isNew: true,
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "System Maintenance Scheduled",
    type: "maintenance",
    priority: "medium",
    date: "2024-01-14",
    author: "DevOps Team",
    description: "Scheduled maintenance window on Sunday 2AM-4AM UTC. Some features may be temporarily unavailable.",
    tags: ["Maintenance", "System", "Downtime"],
    isNew: true,
    readTime: "2 min read"
  },
  {
    id: 3,
    title: "Security Update Applied",
    type: "security",
    priority: "high",
    date: "2024-01-13",
    author: "Security Team",
    description: "Critical security patches have been applied to enhance system security and protect user data.",
    tags: ["Security", "Update", "Critical"],
    isNew: false,
    readTime: "1 min read"
  },
  {
    id: 4,
    title: "New Dashboard Layout Available",
    type: "feature",
    priority: "low",
    date: "2024-01-12",
    author: "UI/UX Team",
    description: "Introducing a new customizable dashboard layout with improved navigation and better mobile experience.",
    tags: ["UI", "Dashboard", "Mobile"],
    isNew: false,
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "API Rate Limits Updated",
    type: "change",
    priority: "medium",
    date: "2024-01-11",
    author: "API Team",
    description: "Updated API rate limits to improve system performance. Check documentation for new limits.",
    tags: ["API", "Limits", "Performance"],
    isNew: false,
    readTime: "2 min read"
  },
  {
    id: 6,
    title: "Bug Fixes and Improvements",
    type: "fix",
    priority: "low",
    date: "2024-01-10",
    author: "Development Team",
    description: "Fixed several minor bugs and improved overall system stability and performance.",
    tags: ["Bug Fix", "Improvement", "Stability"],
    isNew: false,
    readTime: "1 min read"
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Star className="h-4 w-4 text-blue-400" />;
    case "maintenance":
      return <AlertCircle className="h-4 w-4 text-yellow-400" />;
    case "security":
      return <CheckCircle className="h-4 w-4 text-red-400" />;
    case "change":
      return <Info className="h-4 w-4 text-purple-400" />;
    case "fix":
      return <CheckCircle className="h-4 w-4 text-green-400" />;
    default:
      return <Info className="h-4 w-4 text-gray-400" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "text-red-400 bg-red-500/20";
    case "medium":
      return "text-yellow-400 bg-yellow-500/20";
    case "low":
      return "text-green-400 bg-green-500/20";
    default:
      return "text-gray-400 bg-gray-500/20";
  }
};

export default function UpdatesPage() {
  const newUpdatesCount = updates.filter(update => update.isNew).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Updates</h1>
          <p className="text-gray-400">Notifications, changelogs, and system updates</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-400" />
            {newUpdatesCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">{newUpdatesCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search updates..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* AI Summary Card */}
      <Card className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            AI Update Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            <strong>{newUpdatesCount} new updates</strong> since your last visit. 
            <strong> 2 high-priority</strong> items need attention. 
            <strong> AI recommends</strong> reviewing the security update and new AI features first.
          </p>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {["All", "New", "Features", "Security", "Maintenance", "Bug Fixes"].map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === "All" 
                ? "bg-blue-600 text-white" 
                : "bg-white/10 hover:bg-white/20 text-gray-300"
            }`}
          >
            {filter}
            {filter === "New" && newUpdatesCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {newUpdatesCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Updates List */}
      <div className="space-y-4">
        {updates.map((update) => (
          <Card key={update.id} className={`bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 ${
            update.isNew ? 'ring-2 ring-blue-500/50' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getTypeIcon(update.type)}
                    <h3 className="text-white font-semibold text-lg">{update.title}</h3>
                    {update.isNew && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                        NEW
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">{update.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{update.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(update.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'numeric', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <span>{update.readTime}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(update.priority)}`}>
                      {update.priority}
                    </span>
                    {update.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button 
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Open external link"
                  >
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </button>
                  <button 
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Star update"
                  >
                    <Star className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
