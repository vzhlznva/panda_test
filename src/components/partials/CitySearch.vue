<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { GeoService } from '/@src/services/geo';
import { City } from '/@src/types/geo';


const cities = ref<City[]>([] as City[])
const prefix = ref<string | null>(null);
const isResultsActive = ref<boolean>(false);
const search = ref<HTMLDivElement | null>(null)

const service = new GeoService();

const handleResultsActive = () => {
  isResultsActive.value = cities.value.length !== 0 && prefix.value !== ''
}

const fetchCities = async () => {
  try {
    cities.value = await service.getCities(prefix.value);
    handleResultsActive()
  } catch (error: any) {
    console.error(error)
  }
}

onClickOutside(search, () => {
  isResultsActive.value = false
})
</script>

<template>
  <div class="search" ref="search">
    <div class="search-wrapper" :class="{ active: isResultsActive }">
      <IWeatherSearch class="search-icon" />
      <input class="search-input" type="text" name="city" id="city" placeholder="Search your city" v-model="prefix"
        @input="fetchCities" @focus="handleResultsActive">
    </div>
    <div class="search-results" :class="{ active: isResultsActive }">
      <div class="search-results__wrapper">
        <div class="search-results__item" v-for="city in cities" :key="city.id">
          <p class="city">{{ city.name }}</p>
          <p class="country">{{ city.country }}</p>
          <div class="divider"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "/@src/styles/abstracts/mixins";

.search {
  max-width: 353px;
  position: relative;

  &-wrapper {
    background-color: var(--black-800);
    border-radius: 36px;
    padding: 12px 86px 12px 24px;
    width: fit-content;
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;

    &.active {
      border-radius: 36px 36px 0 0;
    }
  }

  &-input {
    background-color: var(--black-800) !important;
    color: var(--white);
    font-family: var(--font);
    border: none;
    outline: none;
    caret-color: var(--white);

    &::placeholder {
      color: var(--black-400);
      font-family: var(--font);
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: var(--white) !important;
      background-color: var(--black-800) !important;
      border: none !important;
      transition: background-color 9999s ease-in-out 0s;
    }

    /* Autofill for Firefox */
    &:-moz-autofill {
      background-color: var(--black-800) !important;
      color: var(--white) !important;
    }
  }

  &-results {
    position: absolute;
    top: 55px;
    width: 100%;
    border-radius: 0 0 36px 36px;
    background-color: var(--black-800);
    max-height: 260px;
    padding: 10px 30px;
    transform: scaleY(0);
    opacity: 0;
    transform-origin: top;
    transition: transform 0.25s ease, opacity 0.25s ease;
    pointer-events: none;

    &__wrapper {
      overflow-y: scroll;
      scrollbar-width: 6px;
      max-height: 220px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      &::-webkit-scrollbar {
        width: 6px;
        border-radius: 5px;
        height: 80%;
      }

      &::-webkit-scrollbar-track {
        border-radius: 5px;
        background: var(--black-800);
        margin-left: 20px;
        height: 80%;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: var(--black-400);
      }
    }


    &__item {
      display: flex;
      flex-direction: column;
      gap: 5px;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 5px 5px 0 5px;
      cursor: pointer;
      border-radius: 10px;
      background-color: transparent;
      transition: background-color 0.25s ease;

      &:hover {
        background-color: var(--black-700);
      }

      .divider {
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #1E1E1E 0%, #4A4949 48%, #1E1E1E 100%);
        margin: 5px 0 0 0;
      }

      .country {
        font-size: var(--small);
        color: var(--black2-100);
      }
    }

    &.active {
      transform: scaleY(1);
      opacity: 1;
      pointer-events: all;
    }
  }
}
</style>