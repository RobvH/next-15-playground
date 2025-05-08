import { RiskStatus } from '@/app/mock-service-layer/actions/RiskStatusEnum'

interface UserData {
  // whatever fields are needed to run
  firstName: string
}

export async function assessRisk(userData: UserData): Promise<RiskStatus> {
  // mock
  const firstChar = userData.firstName.toLowerCase().charAt(0)

  if (firstChar === 'z') {
    return RiskStatus.VERIFY
  }

  if (firstChar === 'f') {
    return RiskStatus.FAIL
  }

  return RiskStatus.ALLOW
}
