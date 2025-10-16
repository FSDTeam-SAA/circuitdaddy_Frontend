import Hero from '@/components/Home/Hero'
import React from 'react'
import ResentBlog from './_components/ResentBlog'

const page = () => {
    return (
        <div>
            <Hero title1="Expert" colorTitile="Knowledge, Real-World" title2="Solutions" description="Stay informed with practical insights from consultants across industries. From AI to healthcare, product design to business strategy, our blog gives you the clarity and tools to overcome challenges, embrace opportunities, and drive meaningful results." image="/blog.jpg" buttonName1="Assemble Your Team" buttonName2="Help Me Build My Team " buttonHref1="/" buttonHref2="/" />
           <ResentBlog/>
       </div>
    )
}

export default page