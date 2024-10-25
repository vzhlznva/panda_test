<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { GeoService } from '../services/geo';
import { LocationItem } from '../types/geo';
import { WeatherService } from '/@src/services/weather';
import { CurrentWeather } from '/@src/types/weather';


const currLoc = ref<LocationItem>({} as LocationItem)
const currWeather = ref<CurrentWeather>()

const weatherService = new WeatherService()
const service = new GeoService();


onBeforeMount(async () => {
  try {
    currLoc.value = await service.getCurrentLocation()
    currWeather.value = await weatherService.getWeather(currLoc.value.latitude, currLoc.value.longitude)
  } catch (error: any) {
    console.error(error)
  }

})
</script>

<template>
  <div class="main-block">
    <div class="main-block__head">
      <h1>WEATHER APP</h1>
      <CitySearch />
    </div>
    <div class="main-block__locations">
      <LocationCard :city="currLoc" :weather="currWeather" v-if="currLoc && currWeather" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-block {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

  }
}
</style>