import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SourceBtn() {
  return (
    <Link href="https://github.com/SkidGod4444/CLOUDBOX">
    <Button variant="outline" size="icon">
        <Github className='h-5 w-5 text-primary' />
    </Button>
    </Link>
  )
}
