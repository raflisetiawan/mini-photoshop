<template>
  <div>
    <div class="row justify-center">
      <!-- Sobel Edge Detection Image -->
      <q-img v-if="sobelImageUrl" :src="sobelImageUrl" style="max-width: 500px" />
    </div>
    <div class="row justify-center q-mt-md">
      <!-- Download Button for Sobel Edge Detection -->
      <q-btn v-if="sobelImageUrl" @click="downloadImage('sobel_edge_detection.jpg')" color="primary"
        label="Download Sobel Edge Detection" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useImageStore } from 'src/stores/image';
import { useSobelEdgeDetection } from 'src/composables/edgeDetector';
import { canvasToUrl, loadImage } from 'src/composables/image';

const { $state } = useImageStore();
const originalImageUrl = ref('');
const sobelImageUrl = ref('');

onMounted(async () => {
  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    // Apply Sobel Edge Detection
    const sobelImage = useSobelEdgeDetection(originalImage);
    sobelImageUrl.value = canvasToUrl(sobelImage);
  } catch (error) {
    console.error(error);
  }
});

watchEffect(async () => {
  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    // Apply Sobel Edge Detection
    const sobelImage = useSobelEdgeDetection(originalImage);
    sobelImageUrl.value = canvasToUrl(sobelImage);
  } catch (error) {
    console.error(error);
  }
});

function downloadImage(filename: string) {
  const link = document.createElement('a');
  link.href = sobelImageUrl.value;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style scoped>
/* Styling if needed */
</style>
