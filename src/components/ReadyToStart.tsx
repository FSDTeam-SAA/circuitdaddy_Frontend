import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const ReadyToStart = () => {
    return (
        <div
            className="w-full container  mx-auto mt-10 mb-28 rounded-2xl bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: "url('/faq.png')" }}
        >

            <div className="relative z-10 text-center px-8 py-12 text-white">
                <h2 className="text-2xl text-[#282828] md:text-3xl font-bold mb-3">
                    Ready to  <span className='text-[#147575]'>Build Your Team?</span>
                </h2>
                <p className="text-sm md:text-base text-[#68706A] max-w-3xl mx-auto opacity-90">
                    We’ll respond with a recommended pod or specialist, plus ballpark budget and timeline.
                </p>
            </div>
            <div className='flex justify-center items-center pb-4'>
                <Link href="/services">
                    <Button className='text-white bg-[#00383B]'>Start a Project Brief</Button>
                </Link>
            </div>
        </div>
    )
}

export default ReadyToStart