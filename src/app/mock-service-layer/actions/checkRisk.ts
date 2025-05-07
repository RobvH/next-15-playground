// actions/checkRisk.ts
'use server'

import { RiskStatus } from './RiskStatusEnum'

export type CheckRiskResponse = {
  riskyStatus: RiskStatus
}

export async function checkRisk(
  formData: FormData,
): Promise<CheckRiskResponse> {
  // Add your risk checking logic here
  // For now, returning a mock implementation
  return {
    riskyStatus: RiskStatus.VERIFY,
  }
}
