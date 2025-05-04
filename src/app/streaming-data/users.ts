import { cache } from 'react'
// This file contains server-side data fetches

interface UserAddress {
  street: string
  suite: string
  city: string
  zipcode: string
}

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: UserAddress
  phone: string
  website: string
}

export const getUsersByIds = cache(
  async (ids: (number | string)[]): Promise<User[]> => {
    // Ensure we have IDs to fetch
    if (!ids.length) return []

    // Use URLSearchParams to properly encode the array of IDs
    const params = new URLSearchParams()
    ids.forEach((id) => params.append('id', id.toString()))

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users?${params.toString()}`,
      {
        // Add cache control to prevent repeated fetches
        cache: 'force-cache',
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`)
    }

    return response.json()
  },
)
