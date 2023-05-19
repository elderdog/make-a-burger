<script setup lang="ts">
import Waiter, { BurgerType } from '../classes/waiters/Waiter'
import BurgerDisplay from '../classes/displays/BurgerDisplay'
import type { IMeal } from '../classes/meals/Meal'
import { useLoggerStore } from '../stores/logger'

defineProps<{ msg: string }>()

const logger = useLoggerStore()

function start() {
  /**
   * BurgerDisplay and Waiter are completely decoupled,
   * and their communication during the process execution is solely maintained by the EventBus,
   * making it difficult to see the relationship between the two,
   * However, BurgerDisplay is still a necessary condition for the process execution,
   * Is this too loose of a coupling between the two? Do they need a direct connection?
   */
  const burgerDisplay = new BurgerDisplay()
  burgerDisplay.onDuty()
  const waiter = new Waiter()
  waiter.onDuty()
  waiter.takeOrder(BurgerType.BEEF, true, ['cheese', 'tomato'])
  const readyCallback = (meal: IMeal) => {
    logger.info(`[Client]: get ready to eat ${meal.getName()}`)
    waiter.off('meal-ready', readyCallback)
    burgerDisplay.offDuty()
    waiter.offDuty()
  }
  waiter.on('meal-ready', readyCallback)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="start">Start</button>
  <button type="button" @click="logger.clear">Clear</button>
  <ul class="log">
    <li v-for="log in logger.logs" :key="log"><code>{{ log }}</code></li>
  </ul>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.log {
  text-align: left;
}
button + button {
  margin-left: 10px;
}
</style>
