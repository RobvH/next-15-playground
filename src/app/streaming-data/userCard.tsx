import { User } from '@/app/streaming-data/users'

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-2 hover:shadow-xl transition-shadow duration-200 border border-gray-100">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {user.username}
          </h3>
          <p className="text-sm text-gray-500">
            ID: {user.id}
          </p>
        </div>
      </div>
    </div>
  )
}
