<script setup lang="ts">
import Waiter, { BurgerType } from '../classes/waiters/Waiter'
import BurgerDisplay from '../classes/displays/BurgerDisplay'
import { useLoggerStore } from '../stores/logger'

defineProps<{ msg: string }>()

const logger = useLoggerStore()

function start() {
  const burgerDisplay = new BurgerDisplay()
  burgerDisplay.onDuty()
  const waiter = new Waiter()
  waiter.onDuty()
  waiter.takeOrder(BurgerType.BEEF, true, ['cheese'])
  waiter.on('meal-ready', meal => {
    logger.info(`[Client]: get ready to eat ${meal.getName()}`)
    burgerDisplay.offDuty()
    waiter.offDuty()
  })
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
