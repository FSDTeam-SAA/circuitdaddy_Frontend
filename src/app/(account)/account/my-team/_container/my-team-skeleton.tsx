import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function MyTeamSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="p-6 space-y-6 animate-pulse">
          {/* Title */}
          <Skeleton className="h-6 w-64 rounded-lg " />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-11/12 rounded" />
            <Skeleton className="h-4 w-10/12 rounded" />
          </div>

          {/* Team Members (3 rows) */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                {/* Avatar */}
                <Skeleton className="h-10 w-10 rounded-full" />

                {/* Name + Role */}
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-36 rounded" />
                  <Skeleton className="h-3 w-24 rounded" />
                </div>

                {/* Role Badge */}
                <Skeleton className="h-6 w-20 ympä rounded-full" />
              </div>
            ))}
          </div>

          {/* Progress Label + Percentage */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-5 w-12 rounded" />
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <div className="bg-primary h-full rounded-full w-[85%]" />
          </div>

          {/* Arrange Meeting Button */}
          <Button className="w-full" disabled>
            <Skeleton className="h-6 w-32 bg-white/20 rounded" />
          </Button>
        </Card>
      ))}
    </div>
  );
}