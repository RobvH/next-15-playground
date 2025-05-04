import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

interface UserData {
  firstName: string
  lastName: string
  shouldFail: boolean
}

export async function addUser(userData: UserData): Promise<number> {
  try {
    const timestamp = Date.now()
    const fileName = `${timestamp}.json`
    const filePath = join(process.cwd(), 'data', fileName)

    // Convert the userData to JSON string with pretty formatting
    const jsonContent = JSON.stringify(userData, null, 2)

    // Write the file
    await writeFile(filePath, jsonContent, 'utf-8')

    return timestamp
  } catch (error) {
    console.error('Error saving user data:', error)
    throw new Error('Failed to save user data')
  }
}

export async function getUser(id: number): Promise<UserData> {
  try {
    const fileName = `${id}.json`
    const filePath = join(process.cwd(), 'data', fileName)

    // Read the file
    const fileContent = await readFile(filePath, 'utf-8')

    // Parse the JSON content
    const userData: UserData = JSON.parse(fileContent)

    return userData
  } catch (error) {
    console.error('Error reading user data:', error)
    throw new Error('Failed to retrieve user data')
  }
}
