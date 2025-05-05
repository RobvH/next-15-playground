'use client'

import { useEffect, ComponentType } from 'react'
import dynamic from 'next/dynamic'

function ClientClickTracker({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const trackingAttribute = 'data-click-tracker'
    const listenerAttribute = 'data-has-listener'

    const getElementValue = (element: HTMLElement) => {
      if (element instanceof HTMLInputElement) {
        if (element.type === 'checkbox' || element.type === 'radio') {
          return element.checked
        }
        return element.value
      }
      if (element instanceof HTMLTextAreaElement) {
        return element.value
      }
      return null
    }

    interface TrackingData {
      name: string | null
      text: string | null
      location: string | null
      elementType: string | null
      timestamp: string
      eventType: string
      isSensitive: boolean
      value?: string | boolean
    }

    const trackEvent = (
      target: HTMLElement,
      eventType: string,
      value: string | boolean | null = null,
    ) => {
      const trackingData: TrackingData = {
        name: target.getAttribute('data-name'),
        text: target.getAttribute('data-text'),
        location: target.getAttribute('data-location'),
        elementType: target.getAttribute('data-element-type'),
        timestamp: new Date().toISOString(),
        eventType,
        isSensitive: target.getAttribute('data-sensitive') === 'true',
      }

      if (value !== null) {
        trackingData.value = value
      }

      console.log('Event tracked:', trackingData)
    }

    const attachEventListeners = (element: Element) => {
      if (element.getAttribute(listenerAttribute)) return

      element.setAttribute(listenerAttribute, 'true')
      const eventName = element.getAttribute('data-event-name')

      if (!eventName) return

      if (eventName === 'ElementClicked' || eventName === 'ProductClicked') {
        element.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement
          trackEvent(target, eventName)
        })
      } else if (eventName === 'FieldInput') {
        element.addEventListener('blur', (e) => {
          const target = e.currentTarget as HTMLElement
          const value = getElementValue(target as HTMLElement)
          trackEvent(target, eventName, value)
        })

        // For checkboxes and radios, also track on change
        if (
          element instanceof HTMLInputElement &&
          (element.type === 'checkbox' || element.type === 'radio')
        ) {
          element.addEventListener('change', (e) => {
            const target = e.currentTarget as HTMLElement
            const value = getElementValue(target as HTMLElement)
            trackEvent(target, eventName, value)
          })
        }
      }
    }

    const attachToExistingElements = () => {
      document
        .querySelectorAll(`[${trackingAttribute}]`)
        .forEach(attachEventListeners)
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof Element) {
              if (node.hasAttribute(trackingAttribute)) {
                attachEventListeners(node)
              }
              node
                .querySelectorAll(`[${trackingAttribute}]`)
                .forEach(attachEventListeners)
            }
          })
        }
      })
    })

    // Initial attach
    attachToExistingElements()

    // Watch for new elements
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
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
