"use client";
import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { ProjectsMyTeamApiResponse } from "./projects-data-type";
import { useSession } from "next-auth/react";
import CircuitdaddyDropdown from "@/components/ui/circuitdaddy-dropdown";
import { useState } from "react";
import MyTeamSkeleton from "./my-team-skeleton";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";

const statusList = [
  // {
  //   value: "pending",
  //   label: "Pending",
  // },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

export default function MyTeamContainer() {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const [status, setStatus] = useState("in_progress");
  const { data, isLoading, error, isError } =
    useQuery<ProjectsMyTeamApiResponse>({
      queryKey: ["my-teams", status],
      queryFn: async () => {
        const res = await fetch(
          `${process?.env?.NEXT_PUBLIC_BACKEND_URL}/project/my?status=${status}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.json();
      },
      enabled: !!token,
    });

  // console.log(data);

  let content;
  if (isLoading) {
    content = (
      <div>
        <MyTeamSkeleton />
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else if (data && data?.data && data?.data?.length === 0) {
    content = (
      <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
    );
  } else if (data && data?.data && data?.data?.length > 1) {
    content = (
      <>
        <div className="pb-8 md:pb-10 w-full flex items-center justify-end">
          <div className="w-full md:w-[200px]">
            <CircuitdaddyDropdown
              options={statusList}
              placeholder="Select Project Status"
              value={status}
              onChange={setStatus}
            />
          </div>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data?.data?.map((project) => (
            <ProjectCard key={project._id} project={project || ""} />
          ))}
        </div>
      </>
    );
  }

  return <main className="">{content}</main>;
}
