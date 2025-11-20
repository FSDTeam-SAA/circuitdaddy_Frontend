"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Blog } from "@/types/blog";
import Link from "next/link";
  
const BlogCard = (blog: Blog) => {

  const getExcerpt = (text: string, length = 120) => {
    return text?.length > length ? text?.substring(0, length) + "..." : text;
  };

  return (
    <Card className="w-full max-w-[400px] bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative w-full h-[220px]">
          <Image
            src={blog?.featuredImage || "/assets/images/blog/blog-1.png"}
            alt={blog?.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>

        {/* Date + Read Time */}
        <div className="text-[#8E938F] text-[12px] font-normal p-4 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Calendar size={16} /> {new Date(blog?.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            {new Date(blog?.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        {/* Blog Title + Excerpt */}
        <div className="px-4 py-3 space-y-2">
          <h2 className="text-[#191D23] mb-1 font-medium text-[18px] leading-snug hover:text-[#147575] cursor-pointer transition-colors">
            {blog?.title}
          </h2>
          <p
            className="text-gray-600 text-sm leading-relaxed mb-4"
            dangerouslySetInnerHTML={{
              __html: getExcerpt(blog?.content, 100),
            }}

          >
          </p>
          <Link href={`/blog/${blog._id}`}>
            <span className="text-[#147575] cursor-pointer font-medium text-[14px]">Read More</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
