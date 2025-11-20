"use client";

import React, { useState } from "react";
import Blogcard from "@/components/reusebale/Blogcard";
import { ReusablePagination } from "@/components/reusebale/Pagination";
import { useGetAllBlog } from "@/hooks/apiCalling";
import { Skeleton } from "@/components/ui/skeleton";

const AllBlog = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetAllBlog(page, 10);

  const blogPosts = data?.data || [];
  const meta = data?.meta;

  const totalResults = meta?.total || 0;
  const resultsPerPage = meta?.limit || 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // 🔹 Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 mb-16 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-full max-w-sm rounded-xl border border-gray-200 p-4 shadow-sm space-y-4 bg-white"
            >
              {/* Image skeleton */}
              <Skeleton className="h-40 w-full rounded-lg" />

              {/* Title skeleton */}
              <Skeleton className="h-5 w-3/4" />

              {/* Meta info skeleton */}
              <div className="flex gap-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>

              {/* Content preview skeleton */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />

              {/* Read more skeleton */}
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 🔹 Error state
  if (isError)
    return (
      <div className="text-center text-red-500 py-10">Failed to load blogs.</div>
    );

  return (
    <div className="container mx-auto px-4">
      {/* Blog grid */}
      <div className="grid grid-cols-1 mb-16 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogPosts.length > 0 ? (
          blogPosts.map((blog) => <Blogcard key={blog._id} {...blog} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No blogs found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <ReusablePagination
          currentPage={page}
          totalPages={totalPages}
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default AllBlog;
