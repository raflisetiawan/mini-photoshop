<template>
  <div>
    <div class="row justify-center">
      <q-img v-if="filterAverageImageUrl" :src="filterAverageImageUrl" style="max-width: 500px" />
    </div>
    <div class="row justify-center q-mt-md">
      <q-input v-model="thresholdValue" label="Threshold Value" type="number" />
      <q-btn @click="applyThresholding" color="primary" label="Apply Thresholding" />
      <q-btn v-if="filterThresholdedImageUrl" @click="downloadImage('thresholded_image.jpg')" color="primary"
        label="Download Thresholded Image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useImageStore } from 'src/stores/image';
import { useAverageFilter, useSimpleThresholding } from 'src/composables/filter';
import { canvasToUrl, loadImage } from 'src/composables/image';

const { $state } = useImageStore();
const originalImageUrl = ref('');
const filterAverageImageUrl = ref('');
const filterThresholdedImageUrl = ref('');
const thresholdValue = ref(128); // Initial threshold value

onMounted(async () => {
  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    const averageFilteredImage = useAverageFilter(originalImage);
    filterAverageImageUrl.value = canvasToUrl(averageFilteredImage);
  } catch (error) {
    console.error(error);
  }
});

watchEffect(async () => {
  try {
    const originalImage = await loadImage($state.image);
    originalImageUrl.value = canvasToUrl(originalImage);

    const averageFilteredImage = useAverageFilter(originalImage);
    filterAverageImageUrl.value = canvasToUrl(averageFilteredImage);
  } catch (error) {
    console.error(error);
  }
});

async function applyThresholding() {
  try {
    const originalImage = await loadImage($state.image);
    const thresholdedImage = useSimpleThresholding(originalImage, thresholdValue.value);
    filterThresholdedImageUrl.value = canvasToUrl(thresholdedImage);
  } catch (error) {
    console.error(error);
  }
}

function downloadImage(filename: string) {
  const link = document.createElement('a');
  link.href = filterThresholdedImageUrl.value;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
