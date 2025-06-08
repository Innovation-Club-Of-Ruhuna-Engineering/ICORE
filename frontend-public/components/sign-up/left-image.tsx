import Image from 'next/image'
import React from 'react'

const LeftImage = () => {
    return (
        <div className="hidden md:flex items-center justify-center text-white relative overflow-hidden">
            {/* Container with relative positioning to hold both image and text */}
            <div className="relative w-[576px] h-[680px]">
                {/* Background Image */}
                <Image
                    src="/reg.png"
                    alt="Innovation Club of Ruhuna Engineering"
                    fill
                    priority
                    className="rounded-[20px] object-cover"
                />

                {/* Optional semi-transparent overlay for better text visibility */}
                <div className="absolute inset-0 bg-icoreBlue/30 rounded-[20px]"></div>

                {/* Text Content - positioned on top of the image */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center max-w-md px-4">
                        <p className="text-[40px] font-bold mt-2">Welcome to the</p>
                        <p className="text-[44px] font-black mt-2">Innovation Club Of Ruhuna Engineering</p>
                        <p className="mt-2 text-[22px]">Your Journey from Concept to Creation.</p>
                        <p className="mt-52 text-[34px] font-bold">Beyond Ideas, Into Action.</p>
                        <p className="text-[22px] mt-2">Innovate together, inspire others, and make a difference.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftImage