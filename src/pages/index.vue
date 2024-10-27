<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { GeoService } from '../services/geo';
import { LocationItem } from '../types/geo';
import { WeatherService } from '/@src/services/weather';
import { Weather, WeatherForecast } from '/@src/types/weather';
import { useBlocksStorage } from '../state/blocks';


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
      <LocationCard :location="block" :isCurrent="blocksStorage.currentIndex == i"
        :isEmpty="block.location == null && block.weather == null" :index="i" v-for="block, i in blocksStorage.blocks"
        @click="blocksStorage.selectBlock(i)" :loading="isLoading" />
      <button class="main-block__locations-add" @click="blocksStorage.addBlock({ location: null, weather: null })"
        v-if="blocksStorage.blocks.length < 5">
        +
      </button>
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
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  width: 100%;

  &__locations {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    width: 100%;
    padding: 0 0 0 2px;

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
  }

  &__chart {
    background-color: var(--black-800);
    border-radius: 24px;
    padding: 24px;
    width: 100%;
  }
}
</style>