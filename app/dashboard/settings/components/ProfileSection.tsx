"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { User, Edit, Upload } from "lucide-react";
import { useAuth } from "../../../providers";
import { useToast } from "../hooks/useToast";
import { profileSchema } from "../utils/validation";
import { ProfileFormData } from "../../../../types/settings";

export default function ProfileSection() {
  const { user, updateProfile } = useAuth();
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});
  
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Initialize form data from user
  useEffect(() => {
    if (user) {
      const nameParts = user.full_name?.split(' ') || ['', ''];
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phone: '', // Phone not in user object yet
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      profileSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
      error.errors?.forEach((err: any) => {
        if (err.path[0]) {
          newErrors[err.path[0] as keyof ProfileFormData] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Controleer de formulier velden');
      return;
    }

    setSaving(true);
    const toastId = toast.loading('Profiel opslaan...');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      await updateProfile({
        full_name: fullName,
        email: formData.email,
      });

      toast.dismiss(toastId);
      toast.success('Profiel succesvol bijgewerkt!');
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.message || 'Fout bij opslaan van profiel');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
        <CardContent className="p-6">
          <p className="text-gray-400">Laden...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5" />
          Profiel Informatie
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {formData.firstName[0]?.toUpperCase() || 'U'}{formData.lastName[0]?.toUpperCase() || ''}
            </div>
            <button 
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              aria-label="Bewerk profielfoto"
              title="Bewerk profielfoto"
            >
              <Edit className="h-3 w-3 text-white" />
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-white text-lg font-semibold">{user.full_name}</h3>
            <p className="text-gray-400">{user.email}</p>
            {/* Company field not available in current User type */}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
              Voornaam <span className="text-red-400">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-3 py-2 bg-white/10 border ${
                errors.firstName ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              disabled={saving}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
              Achternaam <span className="text-red-400">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-3 py-2 bg-white/10 border ${
                errors.lastName ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              disabled={saving}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 bg-white/10 border ${
                errors.email ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              disabled={saving}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Telefoon
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+31612345678 of 0612345678"
              className={`w-full px-3 py-2 bg-white/10 border ${
                errors.phone ? 'border-red-500' : 'border-white/20'
              } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              disabled={saving}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Opslaan...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Profiel Opslaan
              </>
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

