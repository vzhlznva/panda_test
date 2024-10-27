<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { WeatherForecast, WeatherChartItem, WeatherState, ReducedWeatherChartItem } from '/@src/types/weather';
import moment from 'moment';
import { useI18n } from 'vue-i18n';


const props = defineProps<
  {
    forecast: WeatherForecast | null;
    days: number
  }
>()

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

      const dayy = index === 0 ? t('days.today') : index === 1 ? t('days.tomorrow') : dayMoment.format('dddd')
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
    <WeatherCard :item="listItem" :days="days" v-for="listItem in forecastInfo" v-if="forecastInfo.length !== 0" />
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
  max-width: 658px;
}
</style>