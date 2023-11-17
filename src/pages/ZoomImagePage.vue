<template>
  <div id="zoom-page">
    <div class="row justify-center">
      <!-- Zoomed Image -->
      <canvas ref="zoomCanvas" style="max-width: 500px"></canvas>
    </div>
    <div class="row q-mt-md justify-center">
      <!-- Zoom Controls -->
      <q-input @update:model-value="reRender" v-model="imageZoom.zoomFactor" label="Zoom Factor" type="number"
        step="0.1" />
      <q-btn @click="imageZoom.zoomIn" color="primary" icon="search">Zoom In</q-btn>
      <q-btn @click="imageZoom.zoomOut" color="primary" icon="search_off">Zoom Out</q-btn>
      <q-btn @click="imageZoom.resetZoom" color="primary" icon="zoom_out_map">Reset Zoom</q-btn>
      <q-btn v-if="zoomedImageUrl" @click="downloadImage('zoomed_image.jpg')" color="primary"
        label="Download Zoomed Image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useImageZoom } from 'src/composables/image';
import { loadImage, applyZoom, canvasToUrl } from 'src/composables/image';
import { useImageStore } from 'src/stores/image';

const originalImageUrl = ref('');
const zoomedImageUrl = ref('');
const zoomCanvas = ref<HTMLCanvasElement | null>(null);
const { $state } = useImageStore()

// Use the image zoom composable
const imageZoom = useImageZoom({
  initialZoom: 1,
  minZoom: 0.5,
  maxZoom: 2,
});

onMounted(async () => {
  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    // Apply zoom to the original image
    applyZoom(originalImage, zoomCanvas, imageZoom);
  } catch (error) {
    console.error(error);
  }
});

watchEffect(async () => {
  if (imageZoom.zoomFactor.value !== 0) {


    try {
      const originalImage = await loadImage($state.image);
      originalImageUrl.value = canvasToUrl(originalImage);

      // Apply zoom to the original image
      applyZoom(originalImage, zoomCanvas, imageZoom);
    } catch (error) {
      console.error(error);
    }
  }
});

const reRender = async () => {
  console.log('pok');

  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    // Apply zoom to the original image
    applyZoom(originalImage, zoomCanvas, imageZoom);
  } catch (error) {
    console.error(error);
  }
}

function downloadImage(filename: string) {
  const link = document.createElement('a');
  link.href = zoomedImageUrl.value || '';
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style scoped>
/* Styling if needed */
</style>
