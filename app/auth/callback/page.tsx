"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthActions } from '../../../contexts/AuthContextEnhanced';
import { Loader2, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyEmail, loading, error, success, clearError, clearSuccess } = useAuthActions();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        clearError();
        clearSuccess();

        // Get URL parameters
        const token = searchParams.get('token');
        const type = searchParams.get('type');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        // Handle OAuth errors
        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'Er is een fout opgetreden tijdens de authenticatie');
          return;
        }

        // Handle email verification
        if (type === 'email' && token) {
          const result = await verifyEmail(token);
          if (result.success) {
            setStatus('success');
            setMessage('E-mailadres succesvol bevestigd! Je wordt doorgestuurd...');
            setTimeout(() => {
              router.push('/dashboard');
            }, 2000);
          } else {
            setStatus('error');
            setMessage(result.error || 'E-mailadres bevestiging mislukt');
          }
          return;
        }

        // Handle magic link login
        if (token) {
          // The auth state change will be handled by the AuthContext
          setStatus('success');
          setMessage('Succesvol ingelogd! Je wordt doorgestuurd...');
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
          return;
        }

        // Default success case
        setStatus('success');
        setMessage('Authenticatie succesvol! Je wordt doorgestuurd...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);

      } catch (err) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setMessage('Er is een onbekende fout opgetreden');
      }
    };

    handleAuthCallback();
  }, [searchParams, verifyEmail, router, clearError, clearSuccess]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-16 h-16 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'from-blue-50 via-white to-blue-50';
      case 'success':
        return 'from-green-50 via-white to-green-50';
      case 'error':
        return 'from-red-50 via-white to-red-50';
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return 'Authenticatie Bezig...';
      case 'success':
        return 'Authenticatie Succesvol!';
      case 'error':
        return 'Authenticatie Mislukt';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getStatusColor()} flex items-center justify-center p-4`}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {getStatusIcon()}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {getTitle()}
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            {message}
          </p>

          {/* Error Details */}
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                Als dit probleem aanhoudt, neem dan contact op met support.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === 'success' && (
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-3 rounded-xl font-medium text-white transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Naar Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {status === 'error' && (
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-xl font-medium text-white transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Terug naar Inloggen</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}

            {status === 'loading' && (
              <div className="text-sm text-gray-500">
                Even geduld, we verwerken je verzoek...
              </div>
            )}
          </div>

          {/* Additional Info */}
          {status === 'success' && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-800 mb-2">
                  🎉 Welkom bij QuoteFast!
                </h3>
                <p className="text-sm text-green-700">
                  Je account is nu volledig geactiveerd. Je kunt direct aan de slag met alle functies.
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  💡 Hulp Nodig?
                </h3>
                <p className="text-sm text-blue-700">
                  Neem contact op met ons support team via{' '}
                  <a href="mailto:support@quotefast.nl" className="underline">
                    support@quotefast.nl
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
