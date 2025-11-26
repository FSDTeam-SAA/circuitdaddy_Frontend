"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Calendar,
  User,
  Users,
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"; // optional if you separate types
import Image from "next/image";



export interface ProjectDetailResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    project: ProjectDetail;// You can replace 'any' if you later know the booking structure
  };
}

export interface ProjectDetail {
  _id: string;
  title: string;
  description: string;
  client: Client;
  engineers: Engineer[];
  status: "in_progress" | "completed" | "pending";
  totalPaid: number;
  ndaAgreement: string[];
  progress: number;
  totalTimeline: number;
  startDate: string;
  deliveryDate: string;
  usedAmount: number;
  approvedEngineers: ApprovedEngineerRef[];
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Client {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface Engineer {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  professionTitle?: string; // optional because not in API response
}

export interface ApprovedEngineerRef {
  engineer: string;
  status: "approved" | "pending" | "rejected";
  isManager: boolean;
  _id: string;
  progress?: number; // OPTIONAL because some entries include progress
}


const ViewProjectInfo = ({
  open,
  onOpenChange,
  projectId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}) => {
  const { data, isLoading } = useQuery<ProjectDetailResponse>({
    queryKey: ["view-project", projectId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}`
      );
      return await res.json();
    },
  });

  const project = data?.data?.project;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 space-y-2">
        {/* Header */}
        <div>
          {isLoading ? (
            <Skeleton className="h-6 w-40" />
          ) : (
            <h2 className="text-xl font-semibold">{project?.title}</h2>
          )}
          {/* <p className="text-xs text-gray-500">
            Project ID: {project?._id}
          </p> */}
        </div>

        <Separator />

        {/* Description Section */}
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <FileText size={16} /> Description
          </h3>

          {isLoading ? (
            <Skeleton className="h-16 w-full mt-1" />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: project?.description || "",
              }}
              className="text-sm text-gray-600 mt-1 leading-relaxed"
            />
          )}
        </div>

        <Separator />

        {/* Basic Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <h4 className="text-xs text-gray-500">Status</h4>
            <Badge className="mt-1">
              {project?.status}
            </Badge>
          </div>

          {/* Total Paid */}
          <div>
            <h4 className="text-xs text-gray-500">Total Paid</h4>
            <p className="mt-1 flex items-center gap-1">
              <DollarSign size={14} /> {project?.totalPaid}
            </p>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-xs text-gray-500">Total Timeline</h4>
            <p className="mt-1 flex items-center gap-1">
              <Clock size={14} /> {project?.totalTimeline} days
            </p>
          </div>

          {/* Progress */}
          <div>
            <h4 className="text-xs text-gray-500">Progress</h4>
            <p className="mt-1 flex items-center gap-1">
              <CheckCircle size={14} /> {project?.progress}%
            </p>
          </div>
        </div>

        <Separator />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs text-gray-500">Created</h4>
            <p className="mt-1 flex items-center gap-1">
              <Calendar size={14} />
              {moment(project?.createdAt).format("MM-DD-YYYY")}
            </p>
          </div>

          <div>
            <h4 className="text-xs text-gray-500">Delivery Date</h4>
            <p className="mt-1 flex items-center gap-1">
              <Calendar size={14} />
              {moment(project?.deliveryDate).format("MM-DD-YYYY")}
            </p>
          </div>
        </div>

        <Separator />

        {/* Client Info */}
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <User size={16} /> Client
          </h3>

          <div className="flex items-center gap-3 mt-2">
            <Image
              src={project?.client?.profileImage || "/images/no-user.jpeg"}
              alt={project?.client?.firstName || "name"}
              width={1000}
              height={1000}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="text-sm font-medium">
                {project?.client?.firstName} {project?.client?.lastName}
              </p>
              <p className="text-xs text-gray-500">{project?.client?.email}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Engineers */}
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Users size={16} /> Engineers
          </h3>

          <div className="space-y-2 mt-2 h-[180px] overflow-scroll scrollbar-hide">
            {project?.engineers?.map((eng) => (
              <div key={eng._id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-md">
                <Image
                  src={eng.profileImage || "/images/no-user.jpeg"}
                  alt={eng.firstName || "name"}
                  width={1000}
                  height={1000}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">
                    {eng.firstName} {eng.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{eng.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default ViewProjectInfo;
