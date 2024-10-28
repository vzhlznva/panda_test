<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ReducedWeatherChartItem, WeatherChartItem } from '/@src/types/weather';
import { formatTime } from '/@src/utils/formatters';
import { getImageIcon } from '/@src/utils/images';

const props = defineProps<
  {
    item: ReducedWeatherChartItem;
    days: number
  }
>()

const weatherImage = ref<string | undefined>(undefined)

onMounted(async () => {
  weatherImage.value = await getImageIcon(props.item.weather[0].icon) as string
})
</script>

<template>
  <div class="weather-card">
    <p>{{ days === 1 ? formatTime(item.day) : item.day }}</p>
    <img :src="weatherImage">
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
    text-transform: capitalize;

    @media screen and (max-width: 400px) {
      font-size: 12px;
    }
  }

  .day-temp {
    font-size: var(--small);

  }

  .night-temp {
    opacity: 0.8;
  }
}
</style>