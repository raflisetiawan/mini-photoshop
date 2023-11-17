<template>
  <div id="grayscale-page">
    <div class="q-pa-md">
      <div class="row">
        <div class="text-h5">Histogram citra asli</div>
      </div>
      <div class="row justify-center">
        <div class="col-12 text-center">
          <!-- Histogram disini -->
          <canvas ref="histogramCanvas" style="max-width: 500px"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useImageStore } from 'stores/image';
import Chart from 'chart.js/auto';

const { $state } = useImageStore();
const histogramCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if ($state.histogramValue) {
    drawHistogram($state.histogramValue);
  }
});

const drawHistogram = (data: number[]) => {
  if (histogramCanvas.value) {
    const ctx = histogramCanvas.value.getContext('2d');
    if (ctx) {
      const chartData = {
        labels: Array.from({ length: 256 }, (_, i) => i.toString()),
        datasets: [
          {
            label: 'Histogram',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              max: 255,
            },
            y: {
              min: 0,
            },
          },
        },
      });
    }
  }
};
</script>

<style scoped>
/* Styling if needed */
</style>
