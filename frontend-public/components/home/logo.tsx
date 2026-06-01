import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <div>
        <div className="flex h-screen items-center justify-center">
            <Image
                src="/blue.png"
                alt="ICORE Logo"
                width={600}
                height={600}
            />
        </div>
    </div>
  )
}

export default Logo