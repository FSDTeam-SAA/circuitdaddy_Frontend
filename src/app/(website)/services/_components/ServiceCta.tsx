import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ServiceCta = () => {
    return (
        <div
            className="relative rounded-2xl mx-auto my-10 bg-cover bg-center px-6 py-16 text-center"
            style={{ backgroundImage: "url('/serviceCta.jpg')" }}
        >
            {/* Overlay to darken the image */}
            <div className="absolute inset-0 bg-[#109B9B] bg-opacity-50 rounded-2xl"></div>

            {/* Text content stays above overlay */}
            <div className="relative max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl text-[#282828] font-semibold leading-tight">
                    Reserve your team today and{' '}
                    <span className="font-bold text-[#F8F9FA]">get 10% off your kickoff sprint?</span>
                </h2>
                <p className="mt-3 text-sm md:text-base text-white opacity-90">
                  Sometimes you need a developer with a more specific mix of skills to fit your project needs. Let&apos;s see if we can help.
                </p>
                <Link href="/services">
                    <Button className="mt-6 bg-white text-[#00383B] hover:bg-gray-100 font-medium rounded-md px-6 py-2">
                        Reserve Team Now
                    </Button>
                </Link>
            </div>
        </div>

    )
}

export default ServiceCta