<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

import { GeoService } from '../services/geo';
import { LocationItem } from '../types/geo';
import { WeatherService } from '/@src/services/weather';
import { Weather } from '/@src/types/weather';
import { useBlocksStorage } from '../state/blocks';

const config = {
  itemsToShow: 5,
  snapAlign: 'start',
  breakpoints: {
    200: {
      itemsToShow: 1,
      snapAlign: 'start',
    },
    300: {
      itemsToShow: 1.8,
      snapAlign: 'start',
    },
    500: {
      itemsToShow: 2.5,
      snapAlign: 'start',
    },
    800: {
      itemsToShow: 3.5,
      snapAlign: 'start',
    },
    1000: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
    1250: {
      itemsToShow: 5,
      snapAlign: 'start',
    },
  }
}

const currLoc = ref<LocationItem | null>(null)
const currWeather = ref<Weather | null>(null)
const isLoading = ref<boolean>(false)

const blocksStorage = useBlocksStorage()

const weatherService = new WeatherService()
const service = new GeoService();

onBeforeMount(async () => {
  if (blocksStorage.blocks.length == 0) {
    isLoading.value = true
    try {
      currLoc.value = await service.getCurrentLocation()
      currWeather.value = await weatherService.getWeather(currLoc.value.latitude, currLoc.value.longitude)
      blocksStorage.addBlock({ location: currLoc.value, weather: currWeather.value })
      blocksStorage.selectBlock(0)
    } catch (error: any) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
})
</script>

<template>
  <div class="main-block">
    <Header />
    <div class="main-block__locations">
      <Carousel :itemsToShow="config.itemsToShow" snapAlign="start" :breakpoints="config.breakpoints">
        <slide v-for="block, i in blocksStorage.blocks" :key="i">
          <LocationCard :location="block" :isCurrent="blocksStorage.currentIndex == i"
            :isEmpty="block.location == null && block.weather == null" :index="i" @click="blocksStorage.selectBlock(i)"
            :loading="isLoading" />
        </slide>
        <slide v-if="blocksStorage.blocks.length < 5" :key="blocksStorage.blocks.length">
          <button class="main-block__locations-add" @click="blocksStorage.addBlock({ location: null, weather: null })">
            +
          </button>
        </slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
    <div class="main-block__info">
      <div class="main-block__chart">
        <WeatherChart v-if="blocksStorage.currentBlock" :city="blocksStorage.currentBlock.location" />
      </div>
      <Hightights :block="blocksStorage.currentBlock" v-if="blocksStorage.currentBlock" />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.main-block {


  &__locations {
    width: 100%;

    .carousel {
      width: calc(100% + 1.25rem);
      transform: translateX(-0.625rem);

      .carousel__slide {
        padding-left: 0.625rem;
        padding-right: 0.625rem;
      }

      .carousel__icon {
        fill: var(--white);
      }

      :deep(.carousel__prev),
      :deep(.carousel__next) {
        margin: 0 -10px;
      }
    }

    &-add {
      height: 50%;
      aspect-ratio: 1;
      outline: none;
      background-color: var(--black-800);
      border-radius: 100%;
      color: var(--white);
      font-size: var(--h1);
      filter: none;
      transition: filter 0.25s ease;

      &:hover {
        filter: drop-shadow(0px 0px 5px #F5BD52);
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: row;
    gap: 24px;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 1200px) {
      flex-direction: column;
    }
  }

  &__chart {
    background-color: var(--black-800);
    border-radius: 24px;
    padding: 24px;
    width: 100%;
  }
}
</style>