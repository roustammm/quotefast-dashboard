"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Search, Filter, Calendar, User, Activity, AlertTriangle, CheckCircle, Edit, Trash2, Plus, Eye } from "lucide-react";

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "Created new project",
    target: "Website Redesign",
    timestamp: "2024-01-15T10:30:00Z",
    type: "create",
    details: "Project created with initial requirements and timeline",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome/120.0.0.0"
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "Updated project status",
    target: "Mobile App Development",
    timestamp: "2024-01-15T09:15:00Z",
    type: "update",
    details: "Changed status from 'In Progress' to 'Completed'",
    ipAddress: "192.168.1.101",
    userAgent: "Firefox/121.0.0.0"
  },
  {
    id: 3,
    user: "Emma Wilson",
    action: "Uploaded document",
    target: "Design Mockups.png",
    timestamp: "2024-01-15T08:45:00Z",
    type: "upload",
    details: "Uploaded design mockups to project library",
    ipAddress: "192.168.1.102",
    userAgent: "Safari/17.2.0.0"
  },
  {
    id: 4,
    user: "Alex Rodriguez",
    action: "Modified user permissions",
    target: "Lisa Park",
    timestamp: "2024-01-14T16:20:00Z",
    type: "permission",
    details: "Granted admin access to project management tools",
    ipAddress: "192.168.1.103",
    userAgent: "Chrome/120.0.0.0"
  },
  {
    id: 5,
    user: "System",
    action: "Security alert triggered",
    target: "Failed login attempt",
    timestamp: "2024-01-14T14:30:00Z",
    type: "security",
    details: "Multiple failed login attempts from unknown IP address",
    ipAddress: "203.0.113.1",
    userAgent: "Unknown"
  },
  {
    id: 6,
    user: "Lisa Park",
    action: "Deleted file",
    target: "old-document.pdf",
    timestamp: "2024-01-14T11:10:00Z",
    type: "delete",
    details: "Removed outdated project documentation",
    ipAddress: "192.168.1.104",
    userAgent: "Edge/120.0.0.0"
  },
  {
    id: 7,
    user: "Sarah Johnson",
    action: "Added team member",
    target: "New Developer",
    timestamp: "2024-01-13T15:45:00Z",
    type: "add",
    details: "Invited new developer to join the project team",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome/120.0.0.0"
  },
  {
    id: 8,
    user: "Mike Chen",
    action: "Generated report",
    target: "Project Analytics",
    timestamp: "2024-01-13T13:20:00Z",
    type: "report",
    details: "Exported project performance analytics report",
    ipAddress: "192.168.1.101",
    userAgent: "Firefox/121.0.0.0"
  }
];

const getActionIcon = (type: string) => {
  switch (type) {
    case "create":
      return <Plus className="h-4 w-4 text-green-400" />;
    case "update":
      return <Edit className="h-4 w-4 text-blue-400" />;
    case "upload":
      return <Activity className="h-4 w-4 text-purple-400" />;
    case "permission":
      return <User className="h-4 w-4 text-yellow-400" />;
    case "security":
      return <AlertTriangle className="h-4 w-4 text-red-400" />;
    case "delete":
      return <Trash2 className="h-4 w-4 text-red-400" />;
    case "add":
      return <Plus className="h-4 w-4 text-green-400" />;
    case "report":
      return <Eye className="h-4 w-4 text-indigo-400" />;
    default:
      return <Activity className="h-4 w-4 text-gray-400" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "create":
    case "add":
      return "text-green-400 bg-green-500/20";
    case "update":
      return "text-blue-400 bg-blue-500/20";
    case "upload":
      return "text-purple-400 bg-purple-500/20";
    case "permission":
      return "text-yellow-400 bg-yellow-500/20";
    case "security":
      return "text-red-400 bg-red-500/20";
    case "delete":
      return "text-red-400 bg-red-500/20";
    case "report":
      return "text-indigo-400 bg-indigo-500/20";
    default:
      return "text-gray-400 bg-gray-500/20";
  }
};

export default function HistoryPage() {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">History</h1>
          <p className="text-gray-400">Activity log and system changes</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors">
            <Calendar className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search activity log..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* AI Summary Card */}
      <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            AI Activity Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            <strong>8 activities</strong> in the last 24 hours. 
            <strong> 1 security alert</strong> detected and resolved. 
            <strong> Most active user:</strong> Sarah Johnson with 2 actions. 
            <strong> AI detected:</strong> Normal activity patterns, no anomalies.
          </p>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {["All", "Today", "This Week", "Security", "User Actions", "System"].map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === "All" 
                ? "bg-blue-600 text-white" 
                : "bg-white/10 hover:bg-white/20 text-gray-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <Card key={activity.id} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    {getActionIcon(activity.type)}
                  </div>
                  {index < activities.length - 1 && (
                    <div className="w-0.5 h-8 bg-white/20 mt-2"></div>
                  )}
                </div>

                {/* Activity content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">{activity.user}</h3>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-300">{activity.action}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-blue-300 font-medium">{activity.target}</span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-2">{activity.details}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatTimestamp(activity.timestamp)}
                        </span>
                        <span>IP: {activity.ipAddress}</span>
                        <span className="truncate max-w-32">{activity.userAgent}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                        {activity.type}
                      </span>
                      <button 
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="View activity details"
                      >
                        <Eye className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-colors">
          Load More Activities
        </button>
      </div>
    </div>
  );
}
