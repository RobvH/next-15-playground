'use client'

import { withClickTracker } from '@/components/ClickTracker'
import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return children
}

export default withClickTracker(Layout)
