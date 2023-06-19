import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', () => {
  const pageScale = ref(1)
  function changeScale(scale: number) {
    pageScale.value = scale
  }

  return { pageScale, changeScale }
})
