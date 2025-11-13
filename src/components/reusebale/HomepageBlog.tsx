"use client"

import React from "react"
import BlogCard from "./Blogcard"
import { useGetAllBlog } from "@/hooks/apiCalling"
import { Skeleton } from "@/components/ui/skeleton"

const HomepageBlog = () => {
    const { data, isLoading, isError } = useGetAllBlog(1, 8)
    const blogPosts = data?.data || []

    // Render skeletons while loading
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-full max-w-sm rounded-xl border border-gray-200 p-4 shadow-sm space-y-4"
                    >
                        <Skeleton className="h-40 w-full rounded-lg" /> {/* image */}
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-3/4" /> {/* title */}
                            <Skeleton className="h-4 w-1/2" /> {/* author/date */}
                        </div>
                        <Skeleton className="h-4 w-full" /> {/* content snippet */}
                        <Skeleton className="h-4 w-1/3" /> {/* read more button */}
                    </div>
                ))}
            </div>
        )
    }

    // Render error message
    if (isError) {
        return (
            <p className="text-center text-red-500 col-span-full">
                Failed to load blogs. Please try again.
            </p>
        )
    }

    // Render blogs
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {blogPosts.length > 0 ? (
                blogPosts.map((blog) => <BlogCard key={blog._id} {...blog} />)
            ) : (
                <p className="col-span-full text-center text-gray-500">
                    No blogs found.
                </p>
            )}
        </div>
    )
}

export default HomepageBlog
