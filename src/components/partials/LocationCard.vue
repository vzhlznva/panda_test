<script setup lang="ts">
import { onMounted } from 'vue';
import { LocationItem } from '/@src/types/geo';
import { CurrentWeather } from '/@src/types/weather';
import { formatDateByTimeZone, formatDayByTimeZone } from '/@src/utils/formatters';


const props = defineProps<
  {
    city: LocationItem;
    weather: CurrentWeather;
  }
>()

onMounted(() => console.log(props.weather))

</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header__loc">
        <IWeatherLocation />
        <p>{{ city.city }}, {{ city.country }}</p>
      </div>
    </div>
    <div class="card-body">
      <div class="card-body__left">
        <p class="day">{{ formatDayByTimeZone(city.timezone) }}</p>
        <p>{{ formatDateByTimeZone(city.timezone) }}</p>
        <h1>{{ Math.round(weather.main.temp) }}&deg;C</h1>
      </div>
      <div class="card-body__right">
        <img :src="`/~/images/weather/${weather.weather[0].icon}.png`" alt="">
        <div class="card-body__right-temp">
          <h3>{{ weather.weather[0].main }}</h3>
          <p>Feels like {{ Math.round(weather.main.feels_like) }}&deg;C</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: var(--black-800);
  border-radius: 24px;
  padding: 24px;
  width: 19%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 208px;

  &-header {
    display: flex;
    flex-direction: row;

    &__loc {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background-color: var(--black-500);
      border-radius: 16px;
    }
  }

  &-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__left {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .day {
        font-size: var(--h2);
      }

      p {
        font-size: var(--small);
      }

      h1 {
        margin: 6px 0 0 0;
      }
    }

    &__right {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-end;

      img {
        max-height: 64px;
        max-width: 64px;
        size: 110%;
      }

      &-temp {
        text-align: right;
        margin: 2px 0 0 0;

        p {
          font-size: var(--small);
          margin: 4px 0 0 0;
        }
      }
    }
  }
}
</style>