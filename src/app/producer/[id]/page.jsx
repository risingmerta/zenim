import Producer from '@/component/producer/Producer'
import React from 'react'

export default async function page({ params , searchParams }) {
    const param = await params
    const search = await searchParams
    const id = param.id
    const page = search.page || 1
  return (
    <div>
      <Producer id={id} page={page} />
    </div>
  )
}


