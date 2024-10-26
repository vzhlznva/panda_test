<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import {
  Chart,
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, Filler, ChartData, ChartOptions
} from 'chart.js';

interface Props {
  chartData: ChartData<'line'>;
  chartOptions?: ChartOptions<'line'>;
  chartId?: string;
}

Chart.register(
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, Filler
);

const props = defineProps<Props>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const chartInstance = ref<Chart | null>(null);

onMounted(() => {
  if (canvasRef.value) {
    chartInstance.value = new Chart(canvasRef.value, {
      type: 'line',
      data: props.chartData,
      options: props.chartOptions
    });
  }
});

watch(() => props.chartData, (newData) => {
  if (chartInstance.value) {
    chartInstance.value.data = newData;
    chartInstance.value?.update();
  }
});

watch(() => props.chartOptions, (newOptions) => {
  if (chartInstance.value && newOptions) {
    chartInstance.value.options = newOptions;
    chartInstance.value.update();
  }
});
</script>

<template>
  <div class="canvas-container" style="position: relative; height:100%; width:100%">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
canvas {
  height: 100%;
  width: 100%;

}
</style>
