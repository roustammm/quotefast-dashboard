"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

export default function ProfilePage() {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+31 6 12345678",
    location: "Amsterdam, Nederland",
    joinDate: "Januari 2024",
    role: "Administrator"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Hier zou je de API call maken om de profiel gegevens op te slaan
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset naar originele waarden
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary-white">Profiel</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Opslaan
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Annuleren
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Bewerken
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className={`${theme === "dark" ? "bg-white/10 border-white/20" : "bg-white border-gray-200"} backdrop-blur-md`}>
          <CardHeader className="text-center">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-primary-white">{profile.name}</CardTitle>
            <p className="text-secondary-white">{profile.role}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-secondary-white">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-secondary-white">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-yellow-400" />
                <span className="text-secondary-white">{profile.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-purple-400" />
                <span className="text-secondary-white">Lid sinds {profile.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className={`lg:col-span-2 ${theme === "dark" ? "bg-white/10 border-white/20" : "bg-white border-gray-200"} backdrop-blur-md`}>
          <CardHeader>
            <CardTitle className="text-primary-white">Account Instellingen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-white mb-2">Naam</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    placeholder="Voer je naam in"
                    className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-primary-white">{profile.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-white mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    placeholder="Voer je email in"
                    className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-primary-white">{profile.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-white mb-2">Telefoon</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    placeholder="Voer je telefoonnummer in"
                    className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-primary-white">{profile.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-white mb-2">Locatie</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    placeholder="Voer je locatie in"
                    className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-primary-white">{profile.location}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
