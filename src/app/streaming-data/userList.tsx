'use client'

import { use } from 'react'
import { User } from '@/app/streaming-data/users'

import UserCard from '@/app/streaming-data/userCard'

interface UserListProps {
  users: Promise<User[]>
}

export default function UserList({ users }: UserListProps) {
  const allUsers = use(users)

  return (
    <>
      {allUsers.map((user: User) => (
        <UserCard key={user.id} user={user} />
      ))}
    </>
  )
}
