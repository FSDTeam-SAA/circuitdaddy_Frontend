"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useGetAllFaq } from "@/hooks/apiCalling"
import { Skeleton } from "@/components/ui/skeleton"

const AskQ = () => {
    const { data, isLoading } = useGetAllFaq()
    const faqItems = data?.data || []

    return (
        <div className='container mx-auto my-20 px-4 md:px-0 flex flex-col gap-6'>
            <h2 className='text-center text-[#343A40] font-bold text-[40px]'>
                Frequently <span className='text-[#147575]'>Asked Questions</span>
            </h2>
            <p className='text-[#68706A] font-normal text-[16px] text-center mt-1'>
                Get quick answers to the most common questions about Talent Badger, our platform, and how we help you streamline hiring.
            </p>

            <div>
                {isLoading ? (

                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="border-b py-4 flex flex-col gap-3"
                            >
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        ))}
                    </div>
                ) : (

                    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                        {faqItems.map((faq, index: number) => (
                            <AccordionItem key={faq._id} value={`item-${index + 1}`}>
                                <AccordionTrigger
                                    className="text-[#343A40] font-normal text-[18px]"
                                    style={{ fontFamily: "Poppins" }}
                                >
                                    {faq.title}
                                </AccordionTrigger>

                                <AccordionContent>
                                    <div
                                        className="prose prose-gray max-w-full"
                                        dangerouslySetInnerHTML={{ __html: faq.description }}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    )
}

export default AskQ
