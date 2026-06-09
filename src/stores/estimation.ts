import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface FormData {
  type: string
  purity: string
  hasStones: string
  condition: string
  weight: string
}

export interface AnalysisResult {
  loanAmount: number
  buyoutAmount: number
  probability: string
  defects: string
  type: string
  hasStones: string
  condition: string
}

export interface HistoryItem extends AnalysisResult {
  id: number
  timestamp: string
}

export const useEstimationStore = defineStore('estimation', () => {
  const formData = ref<FormData>({
    type: '',
    purity: '',
    hasStones: '',
    condition: '',
    weight: '',
  })

  const previews = ref<string[]>([])
  const files = ref<File[]>([])
  const currentResult = ref<AnalysisResult | null>(null)
  const history = ref<HistoryItem[]>([])
  const isLoading = ref(false)
  const showModal = ref(false)
  const analysisReady = ref(false)

  const saveFormData = (data: Partial<FormData>) => {
    formData.value = { ...formData.value, ...data }
  }

  const savePreviews = (newPreviews: string[]) => {
    previews.value = newPreviews
  }

  const saveFiles = (newFiles: File[]) => {
    files.value = newFiles
  }

  const setResult = (result: AnalysisResult) => {
    currentResult.value = result

    const historyItem: HistoryItem = {
      ...result,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    }

    history.value.unshift(historyItem)

    if (history.value.length > 3) {
      history.value.pop()
    }
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setModalVisible = (visible: boolean) => {
    showModal.value = visible
  }

  const setAnalysisReady = (ready: boolean) => {
    analysisReady.value = ready
  }

  const clearSession = () => {
    formData.value = {
      type: '',
      purity: '',
      hasStones: '',
      condition: '',
      weight: '',
    }
    previews.value = []
    files.value = []
    currentResult.value = null
    analysisReady.value = false
    showModal.value = false
  }

  const clearHistory = () => {
    history.value = []
  }

  return {
    formData,
    previews,
    files,
    currentResult,
    history,
    isLoading,
    showModal,
    analysisReady,
    saveFormData,
    savePreviews,
    saveFiles,
    setResult,
    setLoading,
    setModalVisible,
    setAnalysisReady,
    clearSession,
    clearHistory,
  }
})
