import { getUsersByIds } from '@/app/streaming-data/users'
import { Suspense } from 'react'

import UserList from '@/app/streaming-data/userList'

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ServerDataPage({ searchParams }: PageProps) {
  const { id } = await searchParams
  const ids = Array.isArray(id)
    ? id // If id is an array, use it as is
    : id // If it exists,
      ? [id] // wrap it in an array
      : [] // otherwise use an empty array

  const users = getUsersByIds(ids)

  return (
    <>
      <h1>Server-Client Streaming Data Page</h1>
      <Suspense fallback={<div>Loading users...</div>}>
        <UserList users={users} />
      </Suspense>
    </>
  )
}
