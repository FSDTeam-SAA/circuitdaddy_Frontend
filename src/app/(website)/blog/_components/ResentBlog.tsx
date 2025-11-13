// "use client";

// import Image from "next/image";
// import { Calendar, Clock } from "lucide-react";
// import { useGetBlog } from "@/hooks/apiCalling";
// import Link from "next/link";

// export default function RecentBlogPosts() {
//   const getAllBlogPost = useGetBlog();
//   const blogPosts = getAllBlogPost.data?.data || [];

//   if (getAllBlogPost.isLoading) {
//     return <p className="text-gray-600 text-center">Loading blog posts...</p>;
//   }
//   if (blogPosts.length === 0) {
//     return <p className="text-gray-600 text-center">No blog posts available.</p>;
//   }

//   // Helper to format date
//   const formatDate = (isoString: string) => {
//     return new Date(isoString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };


//   const featuredPost = blogPosts[0];
//   const otherPosts = blogPosts.slice(1);

//   return (
//     <section className="w-full container mx-auto py-12">
//       <h2 className="text-2xl font-bold text-gray-900 mb-8">
//         Recent Blog Posts
//       </h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Featured Post */}
//         <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 lg:row-span-2">
//           <div className="relative h-64 sm:h-72 lg:h-80">
//             <Image
//               src={featuredPost.featuredImage || "/placeholder.svg"}
//               alt={featuredPost.title}
//               fill
//               className="object-cover"
//             />
//           </div>

//           <div className="p-6">
//             <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
//               <div className="flex items-center gap-1.5">
//                 <Calendar className="w-4 h-4" />
//                 <span>{formatDate(featuredPost.createdAt)}</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <Clock className="w-4 h-4" />
//                 <span> {new Date(featuredPost?.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
//               </div>
//             </div>

//             <h2 className="text-[18px] font-medium text-[#191D23] mb-3">
//               {featuredPost.title}
//             </h2>
//             <p
//               className="text-gray-600 text-sm leading-relaxed mb-4"
//               dangerouslySetInnerHTML={{
//                 __html: featuredPost.content.slice(0, 500) || "",
//               }}
//             />
//             <Link
//               href={`/blog/${featuredPost._id}`}
//               className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center transition-colors"
//             >
//               Read More
//             </Link>
//           </div>
//         </article>

//         {/* Smaller Posts */}
//         {otherPosts.map((post) => (
//           <div key={post._id}>
//             <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col sm:flex-row">
//               {/* Image */}
//               <div className="w-full sm:w-[236px] h-[180px]  sm:h-[180px] overflow-hidden">
//                 <Image
//                   src={post.featuredImage || "/placeholder.svg"}
//                   alt={post.title}
//                   width={900}
//                   height={700}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-4 flex flex-col justify-between">
//                 <div className="flex items-center gap-4 text-sm mb-3 flex-wrap">
//                   <div className="flex items-center gap-1.5">
//                     <Calendar className="w-4 h-4 text-[#8E938F]" />
//                     <span className="text-[#8E938F] font-normal text-[12px]">
//                       {formatDate(post.createdAt)}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <Clock className="w-4 h-4 text-[#8E938F]" />
//                     <span className="text-[#8E938F] font-normal text-[12px]">
//                       {new Date(post?.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <h2 className="text-[#191D23] font-medium text-[18px] mb-2">
//                     {post.title}
//                   </h2>
//                   <p
//                     className="text-gray-600 text-sm leading-relaxed mb-4"
//                     dangerouslySetInnerHTML={{
//                       __html: post.content.slice(0, 500) || "",
//                     }}
//                   />
//                   <Link
//                     href={`/blog/${post?._id}`}
//                     className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center transition-colors"
//                   >
//                     Read More
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { useGetBlog } from "@/hooks/apiCalling";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentBlogPosts() {
  const getAllBlogPost = useGetBlog();
  const blogPosts = getAllBlogPost.data?.data || [];

  // 🔹 Show skeletons while loading
  if (getAllBlogPost.isLoading) {
    return (
      <section className="w-full container mx-auto py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Recent Blog Posts
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured post skeleton */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <Skeleton className="h-64 sm:h-72 lg:h-80 w-full" /> {/* Image */}
            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-6 w-3/4" /> {/* Title */}
              <Skeleton className="h-4 w-full" /> {/* Content line 1 */}
              <Skeleton className="h-4 w-5/6" /> {/* Content line 2 */}
              <Skeleton className="h-4 w-1/3" /> {/* Read more */}
            </div>
          </div>

          {/* Smaller post skeletons */}
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col sm:flex-row"
              >
                {/* Image */}
                <Skeleton className="w-full sm:w-[236px] h-[180px]" />
                {/* Content */}
                <div className="p-4 flex flex-col justify-between w-full">
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <p className="text-gray-600 text-center">No blog posts available.</p>
    );
  }

  // 🔹 Helper to format date
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <section className="w-full container mx-auto py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Recent Blog Posts
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Post */}
        <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 lg:row-span-2">
          <div className="relative h-64 sm:h-72 lg:h-80">
            <Image
              src={featuredPost.featuredImage || "/placeholder.svg"}
              alt={featuredPost.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(featuredPost.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(featuredPost?.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <h2 className="text-[18px] font-medium text-[#191D23] mb-3">
              {featuredPost.title}
            </h2>
            <p
              className="text-gray-600 text-sm leading-relaxed mb-4"
              dangerouslySetInnerHTML={{
                __html: featuredPost.content.slice(0, 500) || "",
              }}
            />
            <Link
              href={`/blog/${featuredPost._id}`}
              className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center transition-colors"
            >
              Read More
            </Link>
          </div>
        </article>

        {/* Smaller Posts */}
        {otherPosts.map((post) => (
          <div key={post._id}>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 flex flex-col sm:flex-row">
              <div className="w-full sm:w-[236px] h-[180px] overflow-hidden">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  width={900}
                  height={700}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div className="flex items-center gap-4 text-sm mb-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#8E938F]" />
                    <span className="text-[#8E938F] font-normal text-[12px]">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#8E938F]" />
                    <span className="text-[#8E938F] font-normal text-[12px]">
                      {new Date(post?.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-[#191D23] font-medium text-[18px] mb-2">
                    {post.title}
                  </h2>
                  <p
                    className="text-gray-600 text-sm leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{
                      __html: post.content.slice(0, 500) || "",
                    }}
                  />
                  <Link
                    href={`/blog/${post?._id}`}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
