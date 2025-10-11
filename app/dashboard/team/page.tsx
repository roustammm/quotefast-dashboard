"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Plus, Search, Filter, MoreVertical, UserPlus, Crown, Shield, Mail, Phone, Calendar, Activity } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Project Manager",
    status: "active",
    workload: 85,
    joinDate: "2023-01-15",
    lastActive: "2 hours ago",
    projects: 3,
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@company.com",
    role: "Developer",
    status: "active",
    workload: 92,
    joinDate: "2023-03-20",
    lastActive: "1 hour ago",
    projects: 2,
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@company.com",
    role: "Designer",
    status: "away",
    workload: 67,
    joinDate: "2023-02-10",
    lastActive: "5 hours ago",
    projects: 4,
    avatar: "EW"
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex@company.com",
    role: "Admin",
    status: "active",
    workload: 45,
    joinDate: "2022-11-05",
    lastActive: "30 minutes ago",
    projects: 1,
    avatar: "AR"
  },
  {
    id: 5,
    name: "Lisa Park",
    email: "lisa@company.com",
    role: "Developer",
    status: "offline",
    workload: 78,
    joinDate: "2023-06-12",
    lastActive: "1 day ago",
    projects: 3,
    avatar: "LP"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-400";
    case "away":
      return "bg-yellow-400";
    case "offline":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case "Admin":
      return <Crown className="h-4 w-4 text-yellow-400" />;
    case "Project Manager":
      return <Shield className="h-4 w-4 text-blue-400" />;
    case "Developer":
      return <Activity className="h-4 w-4 text-green-400" />;
    case "Designer":
      return <Activity className="h-4 w-4 text-purple-400" />;
    default:
      return <Activity className="h-4 w-4 text-gray-400" />;
  }
};

export default function TeamPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team</h1>
          <p className="text-gray-400">Manage users, roles, and permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search team members..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* AI Summary Card */}
      <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            AI Team Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            <strong>5 team members</strong> with average workload of 73%. 
            <strong> Mike Chen</strong> has the highest workload (92%). 
            <strong> Consider redistributing</strong> 2 tasks from Mike to Emma or Alex.
          </p>
        </CardContent>
      </Card>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Members</p>
                <p className="text-2xl font-bold text-white">5</p>
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Now</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Workload</p>
                <p className="text-2xl font-bold text-white">73%</p>
              </div>
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Projects</p>
                <p className="text-2xl font-bold text-white">13</p>
              </div>
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Crown className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusColor(member.status)}`}></div>
                  </div>

                  {/* Member Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold">{member.name}</h3>
                      {getRoleIcon(member.role)}
                    </div>
                    <p className="text-gray-400 text-sm">{member.email}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined {new Date(member.joinDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'numeric', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {member.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Workload and Actions */}
                <div className="flex items-center gap-6">
                  {/* Workload */}
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Workload</p>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${member.workload}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white font-medium">{member.workload}%</span>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Projects</p>
                    <p className="text-sm text-white font-medium">{member.projects}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="Send email to member"
                    >
                      <Mail className="h-4 w-4 text-gray-400" />
                    </button>
                    <button 
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="More options"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
