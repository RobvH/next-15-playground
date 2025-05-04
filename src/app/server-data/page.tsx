type User = {
  id: number
  name: string
  username: string
}

async function getUsers(): Promise<User[]> {
  const request = await fetch('https://jsonplaceholder.typicode.com/users')

  return await request.json()
}

export default async function ServerDataPage() {
  const users = await getUsers()

  return (
    <>
      <h1>Server Data Page</h1>

      {users.map((user: User) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </>
  )
}
