import SearchElement from '@/components/global/browse/search.element'
import React from 'react'
import CardsElement from '@/components/global/browse/cards.element'
import { CardItems } from '@/db/constants'

export default function Browse() {
  return (
    <main className="relative bg-muted/40 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-8 px-4">
      <div className='px-5'>
      <CardsElement item={CardItems} />
      </div>
    </main>
  )
}