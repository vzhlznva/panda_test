<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LocationItem } from '/@src/types/geo';
import { WeatherService } from '/@src/services/weather';

import { WeatherChartItem, WeatherForecast } from '/@src/types/weather';
import { ChartData, ChartOptions } from 'chart.js';
import { formatTime } from '/@src/utils/formatters';


const props = defineProps<
  {
    city: LocationItem;
  }
>()

const daysForecast = ref<number[]>([1, 5])
const selectedDays = ref<number>(daysForecast.value[0])
const forecast = ref<WeatherForecast | null>(null)
const chartData = ref<ChartData<'line'>>({
  labels: [],
  datasets: [
    {
      label: '',
      borderColor: "rgba(245, 189, 82, 1)",
      backgroundColor: "rgba(245, 189, 82, 0.2)",
      borderWidth: 2,
      borderJoinStyle: 'round',
      tension: 0.3,
      fill: false,
      data: [],
    }
  ]
})
const chartOptions = ref<ChartOptions<'line'>>({
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const xValue = tooltipItem.label
          const yValue = tooltipItem.formattedValue
          return `${xValue}\n${yValue}\u00B0C`
        }
      }
    }
  }
})

const service = new WeatherService()

const convertChartData = () => {
  forecast.value?.list.forEach((item: WeatherChartItem) => {
    chartData.value?.labels?.push(formatTime(item.dt_txt))
    chartData.value?.datasets[0].data.push(Math.round(item.main.temp_max))
  })
}

const fetchForecast = async () => {
  try {
    forecast.value = await service.getForecast(props.city.latitude, props.city.longitude, selectedDays.value)
  } catch (error: any) {
    console.error(error)
  } finally {
    console.log(forecast.value)
    convertChartData()
    console.log(chartData.value)
  }
}

const handleChangeDays = async (i: number) => {
  selectedDays.value = i;
  await fetchForecast()
}

onMounted(async () => {
  await fetchForecast()
})
</script>

<template>
  <div class="chart-wrapper">
    <div class="chart-wrapper__controls">
      <button class="button" v-for="i in daysForecast" :key="i" :class="{ active: i == selectedDays }"
        @click="handleChangeDays(i)">
        {{ i }} {{ i == 1 ? 'Day' : 'Days' }}
      </button>
    </div>
    <BaseChart :chartData="chartData" :chartOptions="chartOptions" v-if="forecast" />
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;

  &__controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    margin: 0 0 24px;

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
</style>