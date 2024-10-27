<script setup lang="ts">
import { LocationItem } from '/@src/types/geo';
import { WeatherService } from '/@src/services/weather';
import { onMounted, ref, watch } from 'vue';
import { Weather } from '/@src/types/weather';
import { formatUnixDay, formatUnixTime } from '/@src/utils/formatters';
import { useBlocksStorage } from '/@src/state/blocks';
import { locale } from '/@src/i18n';

const props = defineProps<
  {
    location: LocationItem | null;
  }
>()

const favModal = ref()
const currWeather = ref<Weather | null>(null)

const service = new WeatherService()


onMounted(async () => {
  if (props.location) {
    try {
      currWeather.value = await service.getWeather(props.location.latitude, props.location.longitude);
    } catch (error: any) {
      console.error(error)
    }
  }
})

watch(() => locale.value, async () => {
  if (props.location) {
    try {
      currWeather.value = await service.getWeather(props.location.latitude, props.location.longitude);
    } catch (error: any) {
      console.error(error)
    }
  }
})
</script>

<template>
  <div class="favorite">
    <div class="favorite-head">
      <div class="favorite-head__loc">
        <IWeatherLocation />
        {{ location?.city }}, {{ location?.country }}
      </div>
      <IWeatherHeart class="favorite-head__fav" @click="favModal.open()" />
    </div>
    <div class="favorite-body">
      <div class="favorite-body__current">
        <div class="favorite-body__left">
          <p class="day">{{ formatUnixDay(currWeather?.dt as number, currWeather?.timezone as number) }}</p>
          <p>{{ formatUnixTime(currWeather?.dt as number, currWeather?.timezone as number) }}</p>
          <h1 v-if="currWeather">{{ Math.round(currWeather.main.temp) }}&deg;C</h1>
        </div>
        <div class="favorite-body__right">
          <img :src="`/~/images/weather/${currWeather?.weather[0].icon}.png`" alt="" v-if="currWeather">
          <div class="favorite-body__right-temp" v-if="currWeather">
            <h2>{{ currWeather.weather[0].description }}</h2>
            <p>{{ $t('weather.feels') }} {{ Math.round(currWeather.main.feels_like) }}&deg;C</p>
          </div>
        </div>
      </div>
      <div class="favorite-body__forecast">
        <WeatherChart v-if="location" :city="location" />
      </div>
    </div>
    <RemoveFav ref="favModal" :block="location" :favOnly="true" />
  </div>
</template>

<style lang="scss" scoped>
.favorite {
  width: 100%;
  padding: 24px;
  border-radius: 24px;
  background-color: var(--black-800);
  display: flex;
  flex-direction: column;

  gap: 24px;

  &-head {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 24px;
    align-items: center;

    &__loc {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
      padding: 5px 10px;
      background-color: var(--black-500);
      border-radius: 10px;

      p {
        font-size: var(--small);
        max-width: 90px;
      }
    }

    &__fav {
      height: 24px;
      width: 24px;
      cursor: pointer;
      fill: #F5BD52;
      stroke: #F5BD52;
    }
  }

  &-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 50px;

    &__current {
      max-width: 200px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &__left {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .day {
        font-size: var(--h2);
        text-transform: capitalize;
      }

      p {
        font-size: var(--p);
      }

      h1 {
        margin: auto 0 0 0;
        font-size: var(--h1);
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
      }

      h2 {
        text-transform: capitalize;
        font-size: var(--h3);
      }

      &-temp {
        text-align: right;
        margin: 2px 0 0 0;
        max-width: 100px;

        p {
          font-size: var(--small);
          margin: 4px 0 0 0;
        }
      }
    }

    &__forecast {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 24px;

      &-controls {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 16px;
        justify-content: flex-end;
        align-items: center;

        .button {
          cursor: pointer;
          background-color: var(--black-700);
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid var(--black-700);
          filter: none;
          transition: border 0.25s linear, filter 0.25s linear;
          color: var(--white);

          &.active {
            border: 1px solid #F5BD52;
          }

          &:hover {
            filter: drop-shadow(0px 0px 5px #F5BD52);
          }
        }
      }
    }
  }
}
</style>