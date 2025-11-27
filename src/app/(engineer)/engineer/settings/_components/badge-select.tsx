/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { toast } from "sonner";

const BadgeSelect = ({ token }: { token: string }) => {
  const [selectedBadge, setSelectedBadge] = useState("");
  const queryClient = useQueryClient();

  const { data: badgesResponse = {}, isLoading } = useQuery({
    queryKey: ["badges"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/badge`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      const data = await res.json();
      return data;
    },
  });

  const badges = useMemo(() => {
    return badgesResponse.data?.data || [];
  }, [badgesResponse.data?.data]);

  const { mutateAsync } = useMutation({
    mutationKey: ["request-badge"],
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/badge/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ badgeId: id }),
        }
      );

      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Successfully requested for badge.");
      queryClient.invalidateQueries({ queryKey: ["badges"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleBadgeSelect = async (badgeId: string) => {
    setSelectedBadge(badgeId);
    try {
      await mutateAsync(badgeId);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  useEffect(() => {
    if (badges.length > 0 && !selectedBadge) {
      setSelectedBadge(badges[0]._id);
    }
  }, [badges, selectedBadge]);

  if (isLoading) {
    return (
      <div>
        <Label htmlFor="badge">Request For Badge</Label>
        <Select disabled>
          <SelectTrigger id="badge">
            <SelectValue placeholder="Loading badges..." />
          </SelectTrigger>
        </Select>
      </div>
    );
  }

  return (
    <div>
      <Label htmlFor="badge">Request For Badge</Label>
      <Select value={selectedBadge} onValueChange={handleBadgeSelect}>
        <SelectTrigger id="badge">
          <SelectValue placeholder="Choose a badge">
            {selectedBadge &&
              badges.find((badge: any) => badge._id === selectedBadge) && (
                <div className="flex items-center gap-2">
                  {badges.find((badge: any) => badge._id === selectedBadge)
                    ?.badge?.[0] && (
                    <div className="relative w-6 h-6">
                      <Image
                        src={
                          badges.find(
                            (badge: any) => badge._id === selectedBadge
                          )?.badge[0]
                        }
                        alt={
                          badges.find(
                            (badge: any) => badge._id === selectedBadge
                          )?.name
                        }
                        fill
                        className="object-cover rounded"
                        sizes="24px"
                      />
                    </div>
                  )}
                  <span>
                    {
                      badges.find((badge: any) => badge._id === selectedBadge)
                        ?.name
                    }
                  </span>
                </div>
              )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {badges.length > 0 ? (
            badges.map((badge: any) => (
              <SelectItem
                key={badge?._id}
                value={badge?._id}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {badge.badge && badge.badge.length > 0 && (
                    <div className="relative w-6 h-6">
                      <Image
                        src={badge?.badge[0]}
                        alt={badge?.name}
                        fill
                        className="object-cover rounded"
                        sizes="24px"
                      />
                    </div>
                  )}
                  <span>{badge?.name}</span>
                </div>
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-badges" disabled>
              No badges available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BadgeSelect;
