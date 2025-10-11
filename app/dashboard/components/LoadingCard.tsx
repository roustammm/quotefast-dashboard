"use client";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/Skeleton";
import { useTheme } from "../../../contexts/ThemeContext";

export default function LoadingCard() {
  const { theme } = useTheme();
  
  return (
    <Card className={`dashboard-card-enhanced card-loading ${
      theme === "dark" ? "dark" : "light"
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main value skeleton */}
        <div className="flex items-end gap-3">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        
        {/* Progress bar skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        
        {/* Footer skeleton */}
        <div className="pt-2 border-t border-gray-200 dark:border-white/10">
          <Skeleton className="h-3 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}