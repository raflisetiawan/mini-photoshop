<template>
  <div id="grayscale-page">
    <div class="q-pa-md">
      <div class="row">
        <div class="text-h5">Equalized Histogram </div>
      </div>
      <div class="row justify-center">

        <div class="col-12 text-center">
          <!-- Histogram disini -->
          <canvas ref="histogramCanvas" style="max-width: 500px"></canvas>
        </div>
        <div class="col-12">
          <q-img @error="handleImageError()" :src="imageUrl" spinner-color="white" style="max-width: 500px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { useImageStore } from 'stores/image';
import Chart from 'chart.js/auto';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const { loading } = useQuasar()
const { $state } = useImageStore();
const histogramCanvas = ref<HTMLCanvasElement | null>(null);
const imageUrl = ref('');

const getImage = async () => {
  return await api.get(`image/${$state.equalizeImageName}`);
};

const fetchImage = async () => {
  try {
    loading.show({ message: 'Mengambil gambar' });
    const response = await getImage();
    if (response.data.type === 'Buffer') {
      const blob = new Blob([new Uint8Array(response.data.data)], { type: 'image/jpeg' });
      imageUrl.value = URL.createObjectURL(blob);
    }
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
};


onMounted(() => {
  if ($state.equalizeHistogramValue) {
    drawHistogram($state.equalizeHistogramValue);
  }
});

watchEffect(() => {
  // Watch for changes in flipImageName and fetch the new image
  fetchImage();
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

const handleImageError = async () => {
  try {
    loading.show({ message: 'Mengambil gambar' });
    const response = await getImage();
    if (response.data.type === 'Buffer') {
      const blob = new Blob([new Uint8Array(response.data.data)], { type: 'image/jpeg' });
      imageUrl.value = URL.createObjectURL(blob);
    }
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
};

const handleSave = async () => {
  const blob = await fetch(imageUrl.value).then((r) => r.blob());
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = 'binary_image.jpg';
  link.click();
  URL.revokeObjectURL(blobUrl);
};
</script>

<style scoped>
/* Styling if needed */
</style>
