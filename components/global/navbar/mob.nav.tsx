import { cn } from '@/lib/utils'
import React from 'react'
import { ThemeToggle } from '../theme/theme.toggler'
import { Button } from '@/components/ui/button'
import { FileBox, FolderPlus, Share2, UploadCloud } from 'lucide-react'

export default function MobBottomNavbar() {
  return (
    <div className="fixed z-50 bottom-2 left-0 right-0 flex justify-center md:hidden lg:hidden">
      <div className={cn(
          "bg-background border-2 border-muted px-5 w-auto p-2 rounded-md"
      )}>
       <div className='flex items-center justify-between gap-x-4'>
          {/* Place other navbar items here */}
          <Button variant="outline" size="icon" className='bg-muted text-primary hover:bg-primary hover:text-white'>
            <UploadCloud size={25} />
          </Button>
          <Button variant="outline" size="icon" className='bg-muted text-primary hover:bg-primary hover:text-white'>
            <FileBox size={25} />
          </Button>
          <Button variant="outline" size="icon" className='bg-muted text-primary hover:bg-primary hover:text-white'>
            <Share2 size={25} />
          </Button>
          <Button variant="outline" size="icon" className='bg-muted text-primary hover:bg-primary hover:text-white'>
            <FolderPlus size={25} />
          </Button>
       </div>
      </div>
    </div>
  )
}
