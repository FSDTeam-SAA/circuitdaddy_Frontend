"use client";
import { Button } from "@/components/ui/button";
import { useProfileQuery } from "@/hooks/apiCalling";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

interface SessionUser {
  accessToken: string;
}

const AcceptDecline = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const token = (session?.user as SessionUser)?.accessToken;
  const queryClient = useQueryClient();
  const getProfile = useProfileQuery(token);
  const profileData = getProfile.data?.data;
  const hasStripeAccount = profileData?.stripeAccountId;

  const { mutateAsync, isPending: acceptPending } = useMutation({
    mutationKey: ["accept-project"],
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["active-project"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const { mutateAsync: rejectAsync, isPending: rejectPending } = useMutation({
    mutationKey: ["reject-project"],
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["active-project"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleAccept = async (id: string) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectAsync(id);
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  return (
    <div>
      <div className="space-x-5 mt-5">
        <Button
          disabled={acceptPending || !hasStripeAccount}
          onClick={() => handleAccept(id)}
          className="disabled:cursor-not-allowed"
        >
          {acceptPending ? "Accept Request..." : "Accept Request"}
        </Button>

        <Button
          disabled={rejectPending || !hasStripeAccount}
          onClick={() => handleReject(id)}
          variant={"outline"}
          className="border border-primary"
        >
          {rejectPending ? "Decline..." : "Decline"}
        </Button>
      </div>

      <div>
        {!hasStripeAccount && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-5">
            <p className="text-amber-800 text-sm">
              <strong>Payment setup required:</strong> Please connect your
              Stripe account to accept projects and receive payments. Go to{" "}
              <Link href={`/engineer/settings/profile`} className="underline">
                <strong>Settings</strong>
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptDecline;
