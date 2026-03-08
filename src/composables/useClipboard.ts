import { ref } from 'vue'
import { useToast } from './useToast'

export function useClipboard() {
  const { toast } = useToast()
  const copiedValue = ref<string | null>(null)
  let timeout: ReturnType<typeof setTimeout> | null = null

  const copy = async (text: string, message?: string, duration = 2000) => {
    try {
      await navigator.clipboard.writeText(text)
      copiedValue.value = text

      if (message) {
        toast(message, 'success')
      }

      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        copiedValue.value = null
      }, duration)

      return true
    } catch {
      toast('Failed to copy to clipboard', 'error')
      return false
    }
  }

  return {
    copy,
    copiedValue,
    isCopied: (val: string) => copiedValue.value === val,
  }
}
