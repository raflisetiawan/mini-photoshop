<template>
  <div class="row justify-center">
    <q-img v-if="filteredImageUrl" :src="filteredImageUrl" style="max-width: 500px" />
  </div>
  <div class="row justify-center q-mt-md">
    <q-btn v-if="filteredImageUrl" @click="downloadImage" color="primary" label="Download" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useImageStore } from 'src/stores/image';
import { applyMedianFilter } from 'src/composables/filter';
import * as cv from '@techstark/opencv-js';
import { useDialogStore } from 'stores/dialog'
import { canvasToUrl, loadImage } from 'src/composables/image';

const { $state } = useImageStore();
const { $state: dialogState } = useDialogStore();
const originalImageUrl = ref('');
const filteredImageUrl = ref('');

onMounted(async () => {
  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    const filteredImage = originalImage.clone();
    applyMedianFilter(originalImage, filteredImage, parseInt(dialogState.kernelSize.toString())); // Ganti dengan kernel size yang diinginkan
    filteredImageUrl.value = canvasToUrl(filteredImage);
  } catch (error) {
    console.error(error);
  }
});

watchEffect(async () => {
  if (dialogState.kernelSize !== 0) {
    try {
      const originalImage = await loadImage($state.image);
      originalImageUrl.value = canvasToUrl(originalImage);

      const filteredImage = originalImage.clone();
      applyMedianFilter(originalImage, filteredImage, parseInt(dialogState.kernelSize.toString())); // Ganti dengan kernel size yang diinginkan
      filteredImageUrl.value = canvasToUrl(filteredImage);
    } catch (error) {
      console.error(error);
    }
  }
})

function downloadImage() {
  const link = document.createElement('a');
  link.href = filteredImageUrl.value;
  link.download = 'filtered_image.jpg'; // Set the desired filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

</script>

<style scoped>
/* Styling jika diperlukan */
</style>
src/composables/image
