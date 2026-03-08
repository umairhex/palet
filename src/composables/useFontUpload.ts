import { ref } from 'vue'
import { useFonts } from './useFonts'
import { useToast } from './useToast'

const ACCEPTED_FORMATS = ['.ttf', '.otf', '.woff', '.woff2']
const ACCEPTED_MIME_TYPES = [
  'font/ttf',
  'font/otf',
  'font/woff',
  'font/woff2',
  'application/x-font-ttf',
  'application/x-font-opentype',
  'application/font-woff',
  'application/font-woff2',
  '',
]
const MAX_FILE_SIZE = 10 * 1024 * 1024

export function useFontUpload() {
  const { addFont } = useFonts()
  const { toast } = useToast()

  const isUploading = ref(false)
  const uploadProgress = ref(0)
  const uploadingFiles = ref<
    Array<{ name: string; status: 'pending' | 'uploading' | 'success' | 'error'; error?: string }>
  >([])
  const newFontIds = ref<Set<number>>(new Set())

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (!ext || !ACCEPTED_FORMATS.includes(`.${ext}`)) {
      return {
        valid: false,
        error: `Unsupported format: .${ext}. Accepted: ${ACCEPTED_FORMATS.join(', ')}`,
      }
    }
    if (file.type && !ACCEPTED_MIME_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `Unexpected MIME type: ${file.type}. File may not be a valid font.`,
      }
    }
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File is ${(file.size / 1024 / 1024).toFixed(1)}MB — max is 10MB`,
      }
    }
    return { valid: true }
  }

  const uploadFonts = async (files: FileList | null) => {
    if (!files || files.length === 0 || isUploading.value) return

    const validFiles = Array.from(files).filter((f) => {
      const v = validateFile(f)
      if (!v.valid) toast(v.error!, 'error')
      return v.valid
    })

    if (validFiles.length === 0) return

    isUploading.value = true
    uploadProgress.value = 0
    uploadingFiles.value = validFiles.map((f) => ({ name: f.name, status: 'pending' }))
    newFontIds.value.clear()

    let completed = 0
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i]
      const uploadItem = uploadingFiles.value[i]
      if (!uploadItem || !file) continue

      uploadItem.status = 'uploading'

      try {
        const result = await addFont(file)
        newFontIds.value.add(result.id)
        uploadItem.status = 'success'
        completed++
      } catch (error) {
        uploadItem.status = 'error'
        uploadItem.error = error instanceof Error ? error.message : 'Unknown error'
      }
      uploadProgress.value = Math.round(((i + 1) / validFiles.length) * 100)
    }

    if (completed === validFiles.length) {
      const fileName = validFiles[0]?.name || 'Font'
      toast(
        validFiles.length === 1 ? `"${fileName}" uploaded!` : `${completed} fonts uploaded!`,
        'success',
      )
    } else if (completed > 0) {
      toast(`${completed} uploaded, ${validFiles.length - completed} failed`, 'error')
    }

    setTimeout(() => {
      isUploading.value = false
      uploadingFiles.value = []
    }, 2500)

    setTimeout(() => {
      newFontIds.value.clear()
    }, 4000)
  }

  return {
    isUploading,
    uploadProgress,
    uploadingFiles,
    newFontIds,
    uploadFonts,
  }
}
