import { useLoggerStore } from '../../stores/logger'

function LoggerStore() {
  let store: ReturnType<typeof useLoggerStore>

  return {
    getStore() {
      if (!store) {
        store = useLoggerStore()
      }
      return store
    }
  }
}

const logger = {
  info(message: string) {
    LoggerStore().getStore().info(message)
  }
}

export default logger
