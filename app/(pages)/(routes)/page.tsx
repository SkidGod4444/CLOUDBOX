import UploadElement from '@/components/global/upload.element'
import React from 'react'

export default function UploadPage() {
  return (
    <div className="h-full bg-muted/40 flex flex-col items-center justify-center space-y-4">
      <div className='flex w-full md:w-2/3 px-10 mx-4'>
        <UploadElement />
      </div>
    </div>
  )
}
