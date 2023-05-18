import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoggerStore = defineStore('logger', () => {
  const logs = ref<string[]>([])

  function info(message: string) {
    console.log(message)
    logs.value.push(message)
  }

  function clear() {
    logs.value = []
  }

  return { logs, info, clear }
})
