import React from 'react'
import BlogDetails from './BlogDetails'

const page = (params:{params:{id:string}}) => {
  return (
    <div>
        <BlogDetails id={params.params.id}/>
    </div>
  )
}

export default page