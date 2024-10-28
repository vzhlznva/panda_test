<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { LocationBlock, LocationItem } from '/@src/types/geo';
import { WeatherService } from '/@src/services/weather';
import { formatUnixDay, formatUnixTime } from '/@src/utils/formatters';
import { useBlocksStorage } from '/@src/state/blocks';
import { locale } from '/@src/i18n';
import { getImageIcon } from '/@src/utils/images';


const props = defineProps<
  {
    location: LocationBlock | null;
    isEmpty: boolean,
    isCurrent: boolean,
    index: number,
    loading: boolean
  }
>()

const modal = ref()
const favModal = ref()
const limitModal = ref()
const weatherImage = ref<string | undefined>(undefined)

const weatherService = new WeatherService()

const blocksStorage = useBlocksStorage()

const handleFavorite = (loc: LocationBlock, i: number) => {
  if (!loc.fav) {
    if (blocksStorage.favorites.length == 5) {
      limitModal.value.open()
    }
    blocksStorage.addFavorite(loc.location as LocationItem, i)
  } else {
    favModal.value.open()
  }
}

watch(() => props.isCurrent, async () => {
  if (props.isCurrent && !props.isEmpty) {
    try {
      const weather = await weatherService.getWeather(props.location?.location?.latitude as number, props.location?.location?.longitude as number)
      blocksStorage.setCurrentCity({ location: props.location?.location as LocationItem, weather: weather, fav: props.location?.fav })
      weatherImage.value = await getImageIcon(props.location?.weather?.weather[0].icon as string) as string
    } catch (error: any) {
      console.error(error)
    }
  }
})

watch(() => locale.value, async () => {
  if (!props.isEmpty) {
    try {
      console.log('before')
      const weather = await weatherService.getWeather(props.location?.location?.latitude as number, props.location?.location?.longitude as number);
      console.log('after')
      blocksStorage.replaceWeather(weather, props.index)
      weatherImage.value = await getImageIcon(props.location?.weather?.weather[0].icon as string) as string
    } catch (error: any) {
      console.error(error)
    }
  }
})

onMounted(async () => {
  weatherImage.value = await getImageIcon(props.location?.weather?.weather[0].icon as string) as string
})
</script>

<template>
  <div class="card" :class="{ 'current': isCurrent }">
    <div class="card-header" :class="{ 'empty': isEmpty }" v-if="!loading">
      <div class="card-header__loc" v-if="!isEmpty">
        <p>{{ location?.location?.city }}, {{ location?.location?.country_code }}</p>
      </div>
      <div class="card-header__actions">
        <IWeatherDelete class="card-header__fav" @click="modal.open()" />
        <IWeatherHeart class="card-header__fav" :class="{ 'fav': location?.fav }" v-if="!isEmpty"
          @click="handleFavorite(location as LocationBlock, index)" />
      </div>

    </div>
    <div class="card-body" v-if="!isEmpty && !loading">
      <div class="card-body__left">
        <p class="day">{{ formatUnixDay(location?.weather?.dt as number, location?.weather?.timezone as number) }}</p>
        <p>{{ formatUnixTime(location?.weather?.dt as number, location?.weather?.timezone as number) }}</p>
        <h1 v-if="location?.weather">{{ Math.round(location.weather.main.temp) }}&deg;C</h1>
      </div>
      <div class="card-body__right">
        <img :src="weatherImage" alt="" v-if="location?.weather">
        <div class="card-body__right-temp" v-if="location?.weather">
          <h3>{{ location.weather.weather[0].description }}</h3>
          <p>{{ $t('weather.feels') }} {{ Math.round(location.weather.main.feels_like) }}&deg;C</p>
        </div>
      </div>
    </div>
    <div class="card-empty" v-else-if="!loading">
      {{ $t('no-city.select') }}
    </div>
    <Loader v-if="loading" />
    <DeleteModal ref="modal" :index="index" />
    <RemoveFav ref="favModal" :index="index" :block="location?.location" v-if="!isEmpty" :favOnly="false" />
    <ReachedLimit ref="limitModal" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: var(--black-800);
  border-radius: 24px;
  padding: 16px;
  width: calc(100% + 24px);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--black-800);
  transition: border 0.25s ease;
  cursor: pointer;

  &.current {
    border: 1px solid #F5BD52;
  }

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px 0;

    &.empty {
      justify-content: flex-end;
      margin: 0;
    }

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

    &__actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    &__fav {
      height: 24px;
      width: 24px;
      cursor: pointer;

      &.fav {
        fill: #F5BD52;
        stroke: #F5BD52;
      }
    }
  }

  &-body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;

      .day {
        font-size: var(--h3);
        text-transform: capitalize;

        @media screen and (max-width: 600px) {
          font-size: var(--p);
        }
      }

      p {
        font-size: var(--small);
      }

      h1 {
        margin: auto 0 0 0;
        font-size: var(--h2);

        @media screen and (max-width: 600px) {
          font-size: var(--h3);
        }
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

        @media screen and (max-width: 600px) {
          max-height: 40px;
          max-width: 40px;
        }
      }

      &-temp {
        text-align: right;
        margin: 2px 0 0 0;

        h3 {
          text-transform: capitalize;

          @media screen and (max-width: 600px) {
            font-size: var(--p);
          }
        }

        p {
          font-size: var(--small);
          margin: 4px 0 0 0;
        }
      }
    }
  }

  &-empty {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>