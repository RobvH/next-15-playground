'use client'

import { useEffect, ComponentType } from 'react'
import dynamic from 'next/dynamic'

// Separate client-side tracking component
function ClientClickTracker<T extends object>({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const trackingAttribute = 'data-click-tracker'
    const listenerAttribute = 'data-has-click-listener'

    const attachClickListener = (element: Element) => {
      if (element.getAttribute(listenerAttribute)) return

      element.setAttribute(listenerAttribute, 'true')
      element.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement
        const trackingData = {
          name: target.getAttribute('data-name'),
          text: target.getAttribute('data-text'),
          location: target.getAttribute('data-location'),
          elementType: target.getAttribute('data-element-type'),
          timestamp: new Date().toISOString(),
        }
        console.log('Click tracked:', trackingData)
      })
    }

    const attachToExistingElements = () => {
      document
        .querySelectorAll(`[${trackingAttribute}]`)
        .forEach(attachClickListener)
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              if (node.hasAttribute(trackingAttribute)) {
                attachClickListener(node)
              }
              node
                .querySelectorAll(`[${trackingAttribute}]`)
                .forEach(attachClickListener)
            }
          })
        }
      })
    })

    attachToExistingElements()

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return <>{children}</>
}

// Dynamic import with SSR disabled
const DynamicClickTracker = dynamic(() => Promise.resolve(ClientClickTracker), {
  ssr: false,
})

export function withClickTracker<T extends object>(
  WrappedComponent: ComponentType<T>,
) {
  return function WithClickTrackerComponent(props: T) {
    return (
      <DynamicClickTracker>
        <WrappedComponent {...props} />
      </DynamicClickTracker>
    )
  }
}
