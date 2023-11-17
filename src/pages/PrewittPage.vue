<template>
  <div>
    <div class="row justify-center">
      <!-- Prewitt Edge Detection Image -->
      <q-img v-if="prewittImageUrl" :src="prewittImageUrl" style="max-width: 500px" />
    </div>
    <div class="row justify-center q-mt-md">
      <!-- Download Button for Prewitt Edge Detection -->
      <q-btn v-if="prewittImageUrl" @click="downloadImage('prewitt_edge_detection.jpg')" color="primary"
        label="Download Prewitt Edge Detection" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useImageStore } from 'src/stores/image';
import { usePrewittEdgeDetection } from 'src/composables/edgeDetector';
import { canvasToUrl, loadImage } from 'src/composables/image';

const { $state } = useImageStore();
const originalImageUrl = ref('');
const prewittImageUrl = ref('');

onMounted(async () => {
  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    // Apply Prewitt Edge Detection
    const prewittImage = usePrewittEdgeDetection(originalImage);
    prewittImageUrl.value = canvasToUrl(prewittImage);
  } catch (error) {
    console.error(error);
  }
});

watchEffect(async () => {
  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    // Apply Prewitt Edge Detection
    const prewittImage = usePrewittEdgeDetection(originalImage);
    prewittImageUrl.value = canvasToUrl(prewittImage);
  } catch (error) {
    console.error(error);
  }
});

function downloadImage(filename: string) {
  const link = document.createElement('a');
  link.href = prewittImageUrl.value;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style scoped>
/* Styling if needed */
</style>
