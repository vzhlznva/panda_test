<script setup lang="ts">
import { LocationBlock } from '/@src/types/geo';
import { formatUnixTime } from '/@src/utils/formatters';


const props = defineProps<
  {
    block: LocationBlock;
  }
>()

</script>

<template>
  <div class="highlights">
    <h2>{{ $t('weather.high') }}</h2>
    <div class="highlights-body">
      <div class="highlights-body__item small" v-if="block.weather">
        <div class="head">
          <IWeatherWind />
          {{ $t('weather.wind') }}
        </div>
        <div class="data">
          <span>{{ block.weather?.wind.speed }}</span> {{ $t('weather.ms') }}
        </div>
        <div class="time" v-if="block.weather">
          {{ formatUnixTime(block.weather?.dt, block.weather?.timezone) }}
        </div>
      </div>
      <div class="highlights-body__item small" v-if="block.weather">
        <div class="head">
          <IWeatherHumidity />
          {{ $t('weather.humidity') }}
        </div>
        <div class="data">
          <span>{{ block.weather?.main.humidity }}</span> %
        </div>
        <div class="time" v-if="block.weather">
          {{ formatUnixTime(block.weather?.dt, block.weather?.timezone) }}
        </div>
      </div>
      <div class="highlights-body__item small" v-if="block.weather">
        <div class="head">
          <IWeatherVisibility />
          {{ $t('weather.visibility') }}
        </div>
        <div class="data" v-if="block.weather">
          <span>{{ Math.round(block.weather?.visibility / 1000) }}</span> {{ $t('weather.km') }}
        </div>
        <div class="time" v-if="block.weather">
          {{ formatUnixTime(block.weather?.dt, block.weather?.timezone) }}
        </div>
      </div>
      <div class="highlights-body__item big" v-if="block.weather">
        <div class="head">
          <img src="/~/images/weather/sunrise.png" alt="sunrise">
        </div>
        <div class="title">
          {{ $t('weather.sunrise') }}
        </div>
        <div class="time" v-if="block.weather">
          {{ formatUnixTime(block.weather?.sys.sunrise, block.weather?.timezone) }}
        </div>
      </div>
      <div class="highlights-body__item big" v-if="block.weather">
        <div class="head">
          <img src="/~/images/weather/sunset.png" alt="sunrise">
        </div>
        <div class="title">
          {{ $t('weather.sunset') }}
        </div>
        <div class="time" v-if="block.weather">
          {{ formatUnixTime(block.weather?.sys.sunset, block.weather?.timezone) }}
        </div>
      </div>
      <h2 v-else>No Data</h2>
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