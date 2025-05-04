import { User } from '@/app/streaming-data/users'

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="m-2 rounded-lg border border-gray-100 bg-white p-6 shadow-lg transition-shadow duration-200 hover:shadow-xl">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
          <span className="text-xl font-bold text-white">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {user.username}
          </h3>
          <p className="text-sm text-gray-500">ID: {user.id}</p>
        </div>
      </div>
    </div>
  )
}
