import { getUsersByIds } from '@/app/streaming-data/users'
import { Suspense } from 'react'

import UserList from '@/app/streaming-data/userList'

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ServerDataPage({
  searchParams,
}: PageProps) {
  const ids = Array.isArray(searchParams.id)
    ? searchParams.id
    : searchParams.id
      ? [searchParams.id]
      : []

  const users = getUsersByIds(ids)

  return (
    <>
      <h1>Server-Client Streaming Data Page</h1>
      <Suspense fallback={<div>Loading users...</div>}>
        <UserList users={users}/>
      </Suspense>
    </>
  )
}
