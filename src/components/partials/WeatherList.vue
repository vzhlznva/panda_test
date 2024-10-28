<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import moment from 'moment';
import { useI18n } from 'vue-i18n';

import { WeatherForecast, WeatherChartItem, WeatherState, ReducedWeatherChartItem } from '/@src/types/weather';
import { locale } from '/@src/i18n';

const props = defineProps<
  {
    forecast: WeatherForecast | null;
    days: number
  }
>()

const config = {
  itemsToShow: computed(() => props.days == 1 ? 8 : 5).value,
  snapAlign: 'start',
  breakpoints: {
    200: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    300: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
    500: {
      itemsToShow: 5,
      snapAlign: 'start',
    },
    800: {
      itemsToShow: computed(() => props.days == 1 ? 6 : 5).value,
      snapAlign: 'start',
    },
    1000: {
      itemsToShow: computed(() => props.days == 1 ? 6 : 5).value,
      snapAlign: 'start',
    },
    1250: {
      itemsToShow: computed(() => props.days == 1 ? 8 : 5).value,
      snapAlign: 'start',
    },
  }
}

const forecastInfo = ref<ReducedWeatherChartItem[]>([])

const { t } = useI18n()

const mode = (arr: WeatherState[]) => {
  return arr.sort((a: WeatherState, b: WeatherState) =>
    arr.filter((v: WeatherState) => v.icon === a.icon).length
    - arr.filter((v: WeatherState) => v.icon === b.icon).length
  ).pop()
}

const convertForecast = () => {
  forecastInfo.value = []
  if (props.days == 1) {
    props.forecast?.list.forEach((item: WeatherChartItem) => forecastInfo.value?.push({
      day: item.dt_txt,
      weather: item.weather,
      max: item.main.temp,
      min: item.main.temp
    }))
  } else {
    const groupedData: { [key: string]: WeatherChartItem[] } = {}
    props.forecast?.list.forEach((item: WeatherChartItem) => {
      const day = moment(item.dt_txt).startOf('day').format('YYYY-MM-DD');
      if (!groupedData[day]) {
        groupedData[day] = []
      }
      groupedData[day].push(item)
    })
    const today = moment().startOf('day')

    Object.keys(groupedData).forEach((day: string, index) => {
      const dayData = groupedData[day];
      const dayMoment = moment(day);

      const dayy = index === 0 ? t('days.today') : index === 1 ? t('days.tomorrow') : dayMoment.locale(locale.value).format('dddd')
      const maxTemp = Math.max(...dayData.map((item: WeatherChartItem) => item.main.temp_max))
      const minTemp = Math.min(...dayData.map((item: WeatherChartItem) => item.main.temp_min))
      const weath = mode(dayData.map((item: WeatherChartItem) => item.weather[0]))

      forecastInfo.value.push({
        day: dayy,
        weather: [weath] as WeatherState[],
        max: maxTemp,
        min: minTemp
      } as ReducedWeatherChartItem)
    })
  }
}

onMounted(() => {
  convertForecast()
})

watch(() => props.days, () => {
  convertForecast()
})

watch(() => props.forecast, () => {
  convertForecast()
})
</script>

<template>
  <div class="weather-list">
    <Carousel :itemsToShow="config.itemsToShow" snapAlign="start" :breakpoints="config.breakpoints">
      <Slide :key="listItem.day" v-for="listItem in forecastInfo" v-if="forecastInfo.length !== 0">
        <WeatherCard :item="listItem" :days="days" />
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style lang="scss" scoped>
.weather-list {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;

  .carousel {
    width: calc(100% + 1.25rem);
    transform: translateX(-0.625rem);

    @media screen and (max-width: 600px) {
      width: calc(100% + 0.5rem);
      transform: translateX(-0.25rem);
    }

    .carousel__slide {
      padding-left: 0.625rem;
      padding-right: 0.625rem;

      @media screen and (max-width: 600px) {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }
    }

    .carousel__icon {
      fill: var(--white);
    }

    :deep(.carousel__prev),
    :deep(.carousel__next) {
      margin: 0 -15px;
    }
  }
}
</style>