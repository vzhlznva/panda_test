<script setup lang="ts">
import { onMounted } from 'vue';
import { ReducedWeatherChartItem, WeatherChartItem } from '/@src/types/weather';
import { formatTime } from '/@src/utils/formatters';

const props = defineProps<
  {
    item: ReducedWeatherChartItem;
    days: number
  }
>()

onMounted(() => {
  console.log(props.item)
})

</script>

<template>
  <div class="weather-card">
    <p>{{ days === 1 ? formatTime(item.day) : item.day }}</p>
    <img :src="`/~/images/weather/${item.weather[0]?.icon}.png`">
    <p class="day-temp">{{ Math.round(item.max) }}&deg;C</p>
    <p class="night-temp" v-if="days == 5">{{ Math.round(item.min) }}&deg;C</p>
  </div>
</template>

<style lang="scss" scoped>
.weather-card {
  background-color: var(--black-700);
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;

  img {
    max-width: 24px;
  }

  p {
    font-size: var(--small);
  }

  .day-temp {
    font-size: var(--small);

  }

  .night-temp {
    opacity: 0.8;
  }
}
</style>