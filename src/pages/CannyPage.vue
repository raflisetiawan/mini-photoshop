<template>
  <div>
    <div class="row justify-center">
      <!-- Canny Edge Detection Image -->
      <q-img v-if="cannyImageUrl" :src="cannyImageUrl" style="max-width: 500px" />
    </div>
    <div class="row justify-center q-mt-md">

      <!-- Download Button for Canny Edge Detection -->
      <q-btn v-if="cannyImageUrl" @click="downloadImage('canny_edge_detection.jpg')" color="primary"
        label="Download Canny Edge Detection" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useImageStore } from 'src/stores/image';
import { useCannyEdgeDetection } from 'src/composables/edgeDetector';
import { canvasToUrl, loadImage } from 'src/composables/image';

const { $state } = useImageStore();
const originalImageUrl = ref('');
const cannyImageUrl = ref('');

onMounted(async () => {
  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    // Apply Canny Edge Detection
    const cannyImage = useCannyEdgeDetection(originalImage);
    cannyImageUrl.value = canvasToUrl(cannyImage);
  } catch (error) {
    console.error(error);
  }
});

watchEffect(async () => {
  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    // Apply Canny Edge Detection
    const cannyImage = useCannyEdgeDetection(originalImage);
    cannyImageUrl.value = canvasToUrl(cannyImage);
  } catch (error) {
    console.error(error);
  }
});

function downloadImage(filename: string) {
  const link = document.createElement('a');
  link.href = cannyImageUrl.value;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ... loadImage and canvasToUrl functions ...
</script>

<style scoped>
/* Styling jika diperlukan */
</style>
