import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function InfoRowSkeleton() {
  return (
    <div className="flex text-sm gap-3">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

const SideSettingSkeleton = () => {
  return (
    <div>
      <Card className="w-full max-w-[408px] overflow-hidden border-0 shadow-lg">
        <Skeleton className="h-44 w-full" />
        <div className="relative px-6 pb-6">
          {/* Avatar Skeleton */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="relative">
              <Skeleton className="h-32 w-32 rounded-full border-4 border-white shadow-md" />
              <Skeleton className="absolute bottom-2 right-2 h-6 w-6 rounded-full" />
            </div>
          </div>

          {/* Name and Role Skeleton */}
          <div className="pt-20 text-center mb-6">
            <Skeleton className="h-6 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>

          {/* Badges Skeleton */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>

          {/* Information List Skeleton */}
          <div className="space-y-3">
            <InfoRowSkeleton />
            <InfoRowSkeleton />
            <InfoRowSkeleton />
            <InfoRowSkeleton />
            <div className="mt-2">
              <Skeleton className="h-5 w-20" />
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex gap-2 mt-5">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>

          {/* Availability Select Skeleton */}
          <div className="space-y-2 mt-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Badge Select Skeleton */}
          <div className="space-y-2 mt-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SideSettingSkeleton;
