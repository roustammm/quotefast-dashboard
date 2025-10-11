"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthActions } from '../../../contexts/AuthContextEnhanced';
import { Mail, Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function LoginPageEnhanced() {
  const router = useRouter();
  const {
    signIn,
    signInWithMagicLink,
    resetPassword,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
  } = useAuthActions();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isMagicLinkMode, setIsMagicLinkMode] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);

  // Clear messages when component mounts
  useEffect(() => {
    clearError();
    clearSuccess();
  }, [clearError, clearSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    clearSuccess();

    if (isResetMode) {
      const result = await resetPassword(email);
      if (result.success) {
        setIsResetMode(false);
      }
      return;
    }

    if (isMagicLinkMode) {
      const result = await signInWithMagicLink(email);
      if (result.success) {
        setIsMagicLinkMode(false);
      }
      return;
    }

    if (!email || !password) {
      return;
    }

    const result = await signIn(email, password);
    if (result.success) {
      router.push('/dashboard');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchToMagicLink = () => {
    setIsMagicLinkMode(true);
    setIsResetMode(false);
    clearError();
    clearSuccess();
  };

  const switchToReset = () => {
    setIsResetMode(true);
    setIsMagicLinkMode(false);
    clearError();
    clearSuccess();
  };

  const switchToPassword = () => {
    setIsMagicLinkMode(false);
    setIsResetMode(false);
    clearError();
    clearSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <span className="text-2xl font-bold text-white">Q</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welkom terug!
          </h1>
          <p className="text-gray-600">
            {isResetMode 
              ? 'Voer je e-mailadres in om je wachtwoord te resetten'
              : isMagicLinkMode 
                ? 'Voer je e-mailadres in voor een inloglink'
                : 'Log in op je QuoteFast Dashboard account'
            }
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">Succes!</p>
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">Er is een fout opgetreden</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mailadres
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jij@voorbeeld.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Password Field - Only show for password login */}
            {!isMagicLinkMode && !isResetMode && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Wachtwoord
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Wachtwoord"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-xl font-medium text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Bezig...</span>
                </>
              ) : (
                <span>
                  {isResetMode 
                    ? 'Reset Link Verzenden'
                    : isMagicLinkMode 
                      ? 'Inloglink Verzenden'
                      : 'Inloggen'
                  }
                </span>
              )}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center space-y-3">
              {!isMagicLinkMode && !isResetMode && (
                <>
                  <button
                    onClick={switchToMagicLink}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Inloggen zonder wachtwoord
                  </button>
                  <div className="text-gray-400">•</div>
                  <button
                    onClick={switchToReset}
                    className="text-sm text-gray-600 hover:text-gray-700 font-medium transition-colors"
                  >
                    Wachtwoord vergeten?
                  </button>
                </>
              )}

              {(isMagicLinkMode || isResetMode) && (
                <button
                  onClick={switchToPassword}
                  className="text-sm text-gray-600 hover:text-gray-700 font-medium transition-colors"
                >
                  Terug naar wachtwoord inloggen
                </button>
              )}
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Nog geen account?{' '}
              <a
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Registreren
              </a>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">✨ Veilig & Modern</h3>
            <p className="text-sm text-gray-600">
              Gebruik moderne authenticatie met e-mail bevestiging en wachtwoord reset functionaliteit.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">🔐 Privacy First</h3>
            <p className="text-sm text-gray-600">
              Je gegevens zijn veilig met end-to-end encryptie en GDPR compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
