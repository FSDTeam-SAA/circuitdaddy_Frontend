'use client'
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white p-5 border border-gray-200 rounded-lg">
      {/* Title Skeleton */}
      <Skeleton className="h-6 w-3/4 mb-2" />

      {/* Description Skeleton */}
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6 mb-1" />
      <Skeleton className="h-4 w-4/6 mb-4" />

      {/* Person Info Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-5">
        <div className="flex-1 min-w-0">
          {/* Client Skeleton */}
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Approved Engineers List Skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Skeleton className="h-9 w-[110px]" />
                  <Skeleton className="h-9 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Progress Skeleton */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Skeleton className="h-10 w-[110px]" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-6">
        <Skeleton className="w-full h-[45px]" />
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
