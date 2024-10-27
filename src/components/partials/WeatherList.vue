<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { WeatherForecast, WeatherChartItem, WeatherState, ReducedWeatherChartItem } from '/@src/types/weather';
import moment from 'moment';


const props = defineProps<
  {
    forecast: WeatherForecast | null;
    days: number
  }
>()

const forecastInfo = ref<ReducedWeatherChartItem[]>([])

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

      const dayy = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : dayMoment.format('dddd')
      const maxTemp = Math.max(...dayData.map((item: WeatherChartItem) => item.main.temp_max))
      const minTemp = Math.min(...dayData.map((item: WeatherChartItem) => item.main.temp_min))
      const weath = mode(dayData.map((item: WeatherChartItem) => item.weather[0]))
      console.log(weath)


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
  console.log('onMounted', props.forecast)
  convertForecast()
  console.log(forecastInfo.value)
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
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
}
</style>