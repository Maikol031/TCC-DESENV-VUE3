import { ref, provide, inject } from 'vue'
import type { Ref } from 'vue'

const AlertSymbol = Symbol('alert')

export type AlertFunction = (type: 'default' | 'error' | 'success' | 'warning', message: string) => void

export interface AlertState {
  show: boolean
  type: 'default' | 'error' | 'success' | 'warning' | null | undefined
  message: string
}

interface AlertContext {
  alert: Ref<AlertState>
  showAlert: (type: 'default' | 'error' | 'success' | 'warning', message: string) => void
  hideAlert: () => void
}

export function provideAlert() {
  const alert = ref<AlertState>({
    show: false,
    type: 'default',
    message: ''
  })

  const showAlert = (type: 'default' | 'error' | 'success' | 'warning', message: string) => {
    alert.value = {
      show: true,
      type,
      message
    }

    // Auto hide after 3 seconds
    setTimeout(() => {
      hideAlert()
    }, 3000)
  }

  const hideAlert = () => {
    alert.value = {
      show: false,
      type: 'default',
      message: ''
    }
  }

  const context: AlertContext = {
    alert,
    showAlert,
    hideAlert
  }

  provide(AlertSymbol, context)
}

export function useAlert(): AlertContext {
  const alert = inject<AlertContext>(AlertSymbol)
  if (!alert) throw new Error('No alert provided')
  return alert
}