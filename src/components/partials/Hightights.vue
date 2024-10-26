<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LocationItem } from '/@src/types/geo';
import { Weather, WeatherForecast } from '/@src/types/weather';
import { WeatherService } from '/@src/services/weather';
import { formatTime, formatUnixTime } from '/@src/utils/formatters';


const props = defineProps<
  {
    weather: Weather;
  }
>()

</script>

<template>
  <div class="highlights">
    <h2>Today's Highlight</h2>
    <div class="highlights-body">
      <div class="highlights-body__item small">
        <div class="head">
          <IWeatherWind />
          Wind
        </div>
        <div class="data">
          <span>{{ weather.wind.speed }}</span> m/s
        </div>
        <div class="time">
          {{ formatUnixTime(weather.dt, weather.timezone) }}
        </div>
      </div>
      <div class="highlights-body__item small">
        <div class="head">
          <IWeatherHumidity />
          Humidity
        </div>
        <div class="data">
          <span>{{ weather.main.humidity }}</span> %
        </div>
        <div class="time">
          {{ formatUnixTime(weather.dt, weather.timezone) }}
        </div>
      </div>
      <div class="highlights-body__item small">
        <div class="head">
          <IWeatherVisibility />
          Visibility
        </div>
        <div class="data">
          <span>{{ Math.round(weather.visibility / 1000) }}</span> km
        </div>
        <div class="time">
          {{ formatUnixTime(weather.dt, weather.timezone) }}
        </div>
      </div>
      <div class="highlights-body__item big">
        <div class="head">
          <img src="/~/images/weather/sunrise.png" alt="sunrise">
        </div>
        <div class="title">
          Sunrise
        </div>
        <div class="time">
          {{ formatUnixTime(weather.sys.sunrise, weather.timezone) }}
        </div>
      </div>
      <div class="highlights-body__item big">
        <div class="head">
          <img src="/~/images/weather/sunset.png" alt="sunrise">
        </div>
        <div class="title">
          Sunset
        </div>
        <div class="time">
          {{ formatUnixTime(weather.sys.sunset, weather.timezone) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.highlights {
  background-color: var(--black-800);
  border-radius: 24px;
  width: 50%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &-body {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 18px;

    &__item {
      background-color: var(--black-700);
      padding: 16px;
      border-radius: 16px;

      &.small {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: flex-end;

        .head {
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: center;
        }

        .data {
          margin: auto 0;
          font-weight: 600;

          span {
            font-size: var(--h2);
          }
        }
      }

      &.big {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          max-width: 64px;
          margin: 0 0 24px;
        }

        .title {
          font-size: var(--small);
        }

        .time {
          font-size: var(--h3);
        }
      }
    }
  }
}
</style>