"use client";
import { useState } from 'react';
import { 
  Users, UserPlus, Search, Filter, Crown, Shield, Activity, Mail, Phone, Calendar, 
  Loader2, ChevronDown, Trash2, UserCheck, CheckCircle, Clock, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

// Mock data voor team members en activity
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@quotefast.com",
    role: "Project Manager",
    status: "active",
    workload: 85,
    joinDate: "2023-01-15",
    lastActive: "2 2 hours ago",
    projects: 3,
    avatar: "SJ",
    permissions: "Admin",
    inviteStatus: "accepted"
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@quotefast.com",
    role: "Developer",
    status: "active",
    workload: 92,
    joinDate: "2023-03-20",
    lastActive: "1 hour ago",
    projects: 2,
    avatar: "MC",
    permissions: "Developer",
    inviteStatus: "accepted"
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@quotefast.com",
    role: "Designer",
    status: "away",
    workload: 67,
    joinDate: "2023-02-10",
    lastActive: "5 hours ago",
    projects: 4,
    avatar: "EW",
    permissions: "Designer",
    inviteStatus: "accepted"
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex@quotefast.com",
    role: "Admin",
    status: "active",
    workload: 45,
    joinDate: "2022-11-05",
    lastActive: "30 minutes ago",
    projects: 1,
    avatar: "AR",
    permissions: "Admin",
    inviteStatus: "accepted"
  },
  {
    id: 5,
    name: "Lisa Park",
    email: "lisa@quotefast.com",
    role: "Developer",
    status: "offline",
    workload: 78,
    joinDate: "2023-06-12",
    lastActive: "1 day ago",
    projects: 3,
    avatar: "LP",
    permissions: "Developer",
    inviteStatus: "accepted"
  }
];

// Mock activity data
const teamActivity = [
  { id: 1, user: "Mike Chen", action: "completed offer #123", time: "2 hours ago", type: "success" },
  { id: 2, user: "Sarah Johnson", action: "invited new team member", time: "4 hours ago", type: "info" },
  { id: 3, user: "Emma Wilson", action: "updated design template", time: "6 hours ago", type: "info" },
  { id: 4, user: "Alex Rodriguez", action: "reviewed 3 offers", time: "8 hours ago", type: "success" },
  { id: 5, user: "Lisa Park", action: "started new project", time: "1 day ago", type: "info" }
];

// Status colors en icons
const getStatusConfig = (status: string) => {
  switch (status) {
    case "active":
      return { color: "green", label: "Active", icon: CheckCircle };
    case "away":
      return { color: "yellow", label: "Away", icon: Clock };
    case "offline":
      return { color: "gray", label: "Offline", icon: UserCheck };
    default:
      return { color: "gray", label: "Unknown", icon: UserCheck };
  }
};

// Role permissions
const rolePermissions = {
  Admin: { label: "Admin", color: "purple", icon: Crown, permissions: "Full access" },
  Developer: { label: "Developer", color: "blue", icon: Activity, permissions: "Project access" },
  Designer: { label: "Designer", color: "pink", icon: Activity, permissions: "Design access" }
};

// Loading skeleton voor team pagina
const TeamSkeleton = () => (
    <div className="space-y-6">
    {/* Header skeleton */}
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-muted rounded loading-skeleton"></div>
        <div className="h-4 w-80 bg-muted rounded loading-skeleton"></div>
        </div>
      <div className="space-x-2">
        <div className="h-10 w-48 bg-muted rounded-lg loading-skeleton"></div>
        <div className="h-10 w-12 bg-muted rounded-lg loading-skeleton"></div>
      </div>
        </div>

    {/* Stats skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="glass-card p-6 rounded-2xl min-h-[120px]"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-20 loading-skeleton"></div>
              <div className="w-8 h-8 bg-muted rounded-full loading-skeleton"></div>
            </div>
            <div className="h-6 bg-muted rounded loading-skeleton"></div>
            <div className="h-4 bg-muted rounded w-16 loading-skeleton"></div>
              </div>
        </motion.div>
      ))}
              </div>

    {/* Team members skeleton */}
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="glass-card p-4 rounded-xl"
        >
          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 bg-muted rounded-full loading-skeleton"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-32 loading-skeleton"></div>
              <div className="h-3 bg-muted rounded w-24 loading-skeleton"></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded w-24 loading-skeleton"></div>
              <div className="flex gap-2">
                <div className="h-2 bg-muted rounded w-16 loading-skeleton"></div>
                <div className="h-2 bg-muted rounded w-12 loading-skeleton"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Invite Member Modal
const InviteModal = ({ isOpen, onClose, onInvite }: { isOpen: boolean, onClose: () => void, onInvite: (email: string, role: string) => void }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Voer een geldig e-mailadres in");
      return;
    }

    setIsSending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Uitnodiging verzonden!", { duration: 4000 });
      onInvite(email, role);
      setEmail('');
      onClose();
    } catch (error) {
      toast.error("Uitnodiging kon niet worden verzonden");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card-premium w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Teamlid Uitnodigen</h3>
                <button 
                  onClick={onClose} 
                  className="p-1 hover:bg-accent rounded-full transition-colors"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">E-mailadres</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
              </div>
            </div>

              <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Rol</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary"
                  >
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSending || !email}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="modern-glass-button flex-1 px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Versturen...
                      </>
                    ) : (
                      "Uitnodigen"
                    )}
                  </motion.button>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card flex-1 px-4 py-2 rounded-lg text-muted-foreground hover:bg-accent"
                  >
                    Annuleren
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 text-xs text-muted-foreground text-center">
                <p>Teamlid ontvangt een uitnodiging via e-mail en kan binnen 24 uur toetreden.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Team Member Card
const TeamMemberCard = ({ member, onEdit, onRemove }: { member: any, onEdit: (member: any) => void, onRemove: (member: any) => void }) => {
  const statusConfig = getStatusConfig(member.status);
  const roleConfig = rolePermissions[member.role as keyof typeof rolePermissions] || { label: member.role, color: "gray", icon: Activity };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className="glass-card p-4 rounded-xl group cursor-pointer"
    >
              <div className="flex items-center justify-between">
        {/* Avatar & Status */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center text-primary font-semibold text-lg">
                      {member.avatar}
                    </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center`}
              style={{ backgroundColor: statusConfig.color }}
            >
              <statusConfig.icon className="h-3 w-3 text-white" />
            </motion.div>
                  </div>

                  {/* Member Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground line-clamp-1">{member.name}</h3>
              <div className="flex items-center gap-1 px-2 py-1 bg-accent/20 rounded-full text-xs font-medium text-primary">
                <roleConfig.icon className="h-3 w-3" />
                {roleConfig.label}
              </div>
                    </div>
            <p className="text-sm text-muted-foreground">{member.email}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                {new Date(member.joinDate).toLocaleDateString('nl-NL')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {member.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

        {/* Workload & Projects */}
        <div className="flex flex-col items-end gap-4">
          {/* Workload Progress */}
          <div className="w-24">
            <div className="flex justify-between text-xs mb-1">
              <span>Workload</span>
              <span className="text-foreground/80">{member.workload}%</span>
                      </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${member.workload}%` }}
                className="h-2 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                transition={{ duration: 1 }}
              />
                    </div>
                  </div>

          {/* Projects Count */}
                  <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Projects</p>
            <p className="text-sm font-medium text-foreground">{member.projects}</p>
          </div>
                  </div>

                  {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
                      onClick={() => {
              // Edit member
              toast(`Editing ${member.name}`, { duration: 2000 });
            }}
            className="modern-glass-button p-2 rounded-lg text-primary"
            aria-label="Edit member"
          >
            <Mail className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
                      onClick={() => {
              // Remove member
              toast.error(`Removed ${member.name}`, { duration: 3000 });
              onRemove(member.id);
            }}
            className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
            aria-label="Remove member"
          >
            <Trash2 className="h-4 w-4" />
          </motion.button>
                  </div>
                </div>
    </motion.div>
  );
};

// Activity Feed Item
const ActivityItem = ({ activity }: { activity: any }) => {
  const Icon = activity.type === "success" ? CheckCircle : activity.type === "error" ? AlertCircle : Activity;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center gap-3 p-3 rounded-xl glass-card hover:bg-accent/50 transition-all"
    >
      <div className={`flex-shrink-0 w-2 h-2 rounded-full ${activity.type === "success" ? "bg-green-400" : "bg-blue-400"}`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{activity.user}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">{activity.action}</p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
    </motion.div>
  );
};

// Team Stats Cards
const TeamStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <motion.div className="glass-card p-6 rounded-2xl text-center">
      <div className="flex items-center justify-center mb-2">
        <Users className="h-8 w-8 text-primary" />
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground">5</p>
        <p className="text-sm text-muted-foreground">Team Members</p>
      </div>
    </motion.div>

    <motion.div className="glass-card p-6 rounded-2xl text-center">
      <div className="flex items-center justify-center mb-2">
        <CheckCircle className="h-8 w-8 text-green-400" />
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground">3</p>
        <p className="text-sm text-muted-foreground">Active Now</p>
      </div>
    </motion.div>

    <motion.div className="glass-card p-6 rounded-2xl text-center">
      <div className="flex items-center justify-center mb-2">
        <Activity className="h-8 w-8 text-blue-400" />
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground">73%</p>
        <p className="text-sm text-muted-foreground">Avg Workload</p>
      </div>
    </motion.div>

    <motion.div className="glass-card p-6 rounded-2xl text-center">
      <div className="flex items-center justify-center mb-2">
        <Crown className="h-8 w-8 text-purple-400" />
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground">13</p>
        <p className="text-sm text-muted-foreground">Total Projects</p>
      </div>
    </motion.div>
              </div>
);

// Main Team Page Component
export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [activity, setActivity] = useState(teamActivity);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = (inviteData: any) => {
    // Simulate API call
    toast.success(`Uitnodiging verzonden naar ${inviteData.email}`, { duration: 4000 });
    setTeamMembers(prev => [...prev, {
      id: Date.now(),
      name: inviteData.email.split('@')[0],
      email: inviteData.email,
      role: inviteData.role,
      status: "invited",
      workload: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: "Just invited",
      projects: 0,
      avatar: inviteData.email[0].toUpperCase(),
      permissions: inviteData.role,
      inviteStatus: "pending"
    }]);
  };

  const handleRemove = (id: any) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
    toast.success("Teamlid verwijderd", { duration: 3000 });
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen space-y-8 p-6">
        <TeamSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8 p-6 bg-background">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div className="flex-1">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-foreground"
          >
            Team Management
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Beheer je teamleden, rollen en projecttoewijzingen
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Zoek teamleden..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background/80 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsInviteOpen(true)}
            className="glass-card-premium inline-flex items-center gap-2 px-6 py-2 rounded-lg font-medium shadow-lg"
          >
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Invite Member</span>
            <span className="sm:hidden">Invite</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Team Stats */}
      <TeamStats />

      {/* Team Members Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Team Members ({filteredMembers.length})</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-400" />
              {teamMembers.filter(m => m.status === "active").length} active
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-yellow-400" />
              {teamMembers.filter(m => m.status === "away").length} away
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <TeamMemberCard 
                member={member} 
                onEdit={() => toast(`Editing ${member.name}`)}
                onRemove={handleRemove}
              />
            </motion.div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 glass-card rounded-2xl p-8"
          >
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Geen teamleden gevonden</h3>
            <p className="text-muted-foreground mb-6">Je team is nog leeg. Nodig je eerste lid uit om te beginnen.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsInviteOpen(true)}
              className="modern-glass-button inline-flex items-center gap-2 px-4 py-2"
            >
              <UserPlus className="h-4 w-4" />
              Eerste teamlid uitnodigen
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Activity Feed */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            Recente Activiteit
            <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Live
            </span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="modern-glass-button inline-flex items-center gap-2 px-4 py-2 text-sm"
            onClick={() => toast("Activiteit feed verversen", { duration: 2000 })}
          >
            <Activity className="h-4 w-4" />
            Refresh
          </motion.button>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto glass-card rounded-2xl p-4">
          {activity.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ActivityItem activity={item} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Invite Modal */}
      <InviteModal 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}
