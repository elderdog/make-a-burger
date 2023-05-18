<script setup lang="ts">
import { ref } from 'vue'
import Waiter, { BurgerType } from '../classes/waiters/Waiter'
import BurgerDisplay from '../classes/displays/BurgerDisplay'

defineProps<{ msg: string }>()

const logs = ref<string[]>([])

function start() {
  const burgerDisplay = new BurgerDisplay()
  burgerDisplay.onDuty()
  const waiter = new Waiter()
  waiter.onDuty()
  waiter.takeOrder(BurgerType.BEEF, true, ['cheese'])
  waiter.on('meal-ready', meal => logs.value.push(meal.getName()))
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="start">Start</button>
  <ul class="log">
    <li v-for="log in logs" :key="log"><code>{{ log }}</code></li>
  </ul>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.log {
  text-align: left;
}
</style>
