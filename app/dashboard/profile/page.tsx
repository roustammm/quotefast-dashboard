"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect naar de nieuwe profile sectie in settings
    router.replace('/dashboard/settings?tab=profile');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex items-center gap-3 text-gray-400">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Doorverwijzen naar profiel instellingen...</span>
      </div>
    </div>
  );
}
