<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { GeoService } from '../services/geo';
import { LocationItem } from '../types/geo';
import { WeatherService } from '/@src/services/weather';
import { Weather, WeatherForecast } from '/@src/types/weather';


const currLoc = ref<LocationItem | null>(null)
const currWeather = ref<Weather | null>(null)
const forecast = ref<WeatherForecast | undefined>(undefined)

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
    <div class="main-block__info">
      <div class="main-block__chart">
        <WeatherChart v-if="currLoc" :city="currLoc" />
      </div>
      <Hightights :weather="currWeather" v-if="currWeather" />
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
  padding: 97px 0 0;

  &__head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    max-width: 1092px;
    position: fixed;
    top: 0;
    height: 97px;
    background-color: var(--black2-800);

    h1 {
      margin: 0 0 10px 0;
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