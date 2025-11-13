import { BlogResponse, SingelBlogResponse } from "@/types/blog"

export async function getBlog() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog?page=1&limit=3`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    const resData: BlogResponse = await response.json()
    if (!response.ok) {
        throw new Error(resData.message || "Failed to get blog data")
    }
    return resData 
}

export async function getAllBlog( { page , limit  }: { page?: number; limit?: number } ) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog?page=${page}&limit=${limit}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    const resData: BlogResponse = await response.json()
    if (!response.ok) {
        throw new Error(resData.message || "Failed to get blog data")
    }
    return resData 
}

export async function getSingleBlog(id:string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    const resData: SingelBlogResponse = await response.json()
    if (!response.ok) {
        throw new Error(resData.message || "Failed to get blog data")
    }
    return resData 
}