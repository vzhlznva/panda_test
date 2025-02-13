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

watch(() => props.chartData, (newData, oldData) => {
  if (newData !== oldData) {
    if (chartInstance.value) {
      chartInstance.value.data = newData;
      chartInstance.value.update();
    }
  }
});

watch(() => props.chartOptions, (newOptions, oldOptions) => {
  if (newOptions !== oldOptions) {
    if (chartInstance.value && newOptions) {
      chartInstance.value.options = newOptions;
      chartInstance.value.update();
    }
  }
});
</script>

<template>
  <div class="canvas-container" style="position: relative; width:100%; z-index: 1;">
    <canvas ref="canvasRef" style="position: relative; z-index: 0; width:100%; height: 100%; aspect-ratio: 2"></canvas>
  </div>
</template>

<style lang="scss" scoped></style>
