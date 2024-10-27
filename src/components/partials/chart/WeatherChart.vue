<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { LocationBlock, LocationItem } from '/@src/types/geo';
import { WeatherService } from '/@src/services/weather';

import { WeatherChartItem, WeatherForecast } from '/@src/types/weather';
import { ChartData, ChartOptions } from 'chart.js';
import { formatTime } from '/@src/utils/formatters';
import moment, { max } from 'moment';


const props = defineProps<
  {
    city: LocationItem;
    fav?: boolean
  }
>()

const daysForecast = ref<number[]>([1, 5])
const selectedDays = ref<number>(daysForecast.value[0])
const forecast = ref<WeatherForecast | null>(null)
const isChartDataReady = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const isEmpty = computed<boolean>(() => props.city == null)
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
    },
    {
      label: '',
      borderColor: "rgba(128, 205, 246, 1)",
      backgroundColor: "rgba(128, 205, 246, 0.2)",
      borderWidth: 2,
      borderJoinStyle: 'round',
      tension: 0.3,
      fill: false,
      hidden: true,
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
  }
})

const service = new WeatherService()

const convertChartData = () => {
  chartData.value.labels = [];
  chartData.value.datasets[0].data = []
  chartData.value.datasets[1].data = []
  chartData.value.datasets[1].hidden = true

  if (selectedDays.value == 1) {
    forecast.value?.list.forEach((item: WeatherChartItem) => {
      chartData.value?.labels?.push(formatTime(item.dt_txt))
      chartData.value?.datasets[0].data.push(Math.round(item.main.temp))
    })
  } else {
    const groupedData: { [key: string]: WeatherChartItem[] } = {}
    forecast.value?.list.forEach((item: WeatherChartItem) => {
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

      chartData.value.labels?.push(index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : dayMoment.format('dddd'))
      const maxTemp = Math.max(...dayData.map((item: WeatherChartItem) => item.main.temp_max))
      const minTemp = Math.min(...dayData.map((item: WeatherChartItem) => item.main.temp_min))

      chartData.value.datasets[0].data.push(Math.round(maxTemp));
      chartData.value.datasets[1].data.push(Math.round(minTemp));
      chartData.value.datasets[1].hidden = false
    })
  }

  isChartDataReady.value = true
}

const fetchForecast = async () => {
  isChartDataReady.value = false
  isLoading.value = true
  if (!isEmpty.value) {
    try {
      forecast.value = await service.getForecast(props.city.latitude as number, props.city.longitude as number, selectedDays.value)
    } catch (error: any) {
      console.error(error)
    } finally {
      convertChartData()
      isLoading.value = false
    }
  } else isLoading.value = false

}

const handleChangeDays = async (i: number) => {
  selectedDays.value = i;
  await fetchForecast()
}

onMounted(async () => {
  await fetchForecast()
})

watch(() => props.city, async () => {
  await fetchForecast()
})
</script>

<template>
  <div class="chart-wrapper">
    <div class="chart-wrapper__controls" :class="{ 'fav': fav }">
      <button class="button" v-for="i in daysForecast" :key="i" :class="{ active: i == selectedDays }"
        @click="handleChangeDays(i)">
        {{ i }} {{ i == 1 ? 'Day' : 'Days' }}
      </button>
    </div>
    <WeatherList :forecast="forecast" :days="selectedDays" v-if="forecast && !isLoading && !isEmpty" />
    <BaseChart :chartData="chartData" :chartOptions="chartOptions"
      v-if="isChartDataReady && chartData && !isLoading && !isEmpty" />
    <h1 v-if="isEmpty && !isLoading">No data, please select city</h1>
    <Loader height="90%" v-if="isLoading" />
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;

  h1 {
    text-align: center;
    margin: auto 0;
  }

  &__controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    margin: 0 0 24px;

    &.fav {
      justify-content: flex-end;
    }

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