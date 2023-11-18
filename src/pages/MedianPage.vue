<template>
  <div id="negative-page">
    <div class="q-pa-md">
      <div class="row">
        <div class="text-h5">Hasil Filter median citra </div>
      </div>
      <div class="row justify-center">
        <div class="col-12 text-center">
          <q-img @error="handleImageError()" :src="imageUrl" spinner-color="white" style="max-width: 500px" />
        </div>
      </div>
      <div class="row q-mt-md justify-center">
        <q-btn color="primary" @click="handleSave" icon="save">Simpan</q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref, watchEffect } from 'vue';
import { useImageStore } from 'src/stores/image';
import { useQuasar } from 'quasar';
import { useDialogStore } from 'src/stores/dialog';

const { $state: imageState } = useImageStore();
const imageUrl = ref('');
const { $state } = useDialogStore()

const { loading } = useQuasar()
const initImage = async () => {
  try {
    loading.show({ message: 'Mengambil gambar' })
    const response = await getImage();
    if (response.data.type === 'Buffer') {
      // Mengonversi Buffer menjadi Blob
      const blob = new Blob([new Uint8Array(response.data.data)], { type: 'image/jpeg' });

      // Membuat URL objek dari Blob
      imageUrl.value = URL.createObjectURL(blob);
    }
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
}
const getImage = async () => {
  return await api.get(`image/${imageState.medianFilterImageName}`);
};
onMounted(async () => {
  await initImage()
});

const kernelSizeTemp = ref($state.kernelSize)


watchEffect(async () => {
  if ($state.kernelSize !== kernelSizeTemp.value) {
    await initImage()
    kernelSizeTemp.value = $state.kernelSize
  }
})

const handleImageError = async () => {
  try {
    loading.show({ message: 'Mengambil gambar' })
    const response = await getImage();
    if (response.data.type === 'Buffer') {
      // Mengonversi Buffer menjadi Blob
      const blob = new Blob([new Uint8Array(response.data.data)], { type: 'image/jpeg' });

      // Membuat URL objek dari Blob
      imageUrl.value = URL.createObjectURL(blob);
    }
  } catch (error) {
    throw error;
  } finally {
    loading.hide()
  }
};

const handleSave = async () => {
  // Mendapatkan blob dari URL gambar
  const blob = await fetch(imageUrl.value).then((r) => r.blob());

  // Membuat objek URL untuk blob
  const blobUrl = URL.createObjectURL(blob);

  // Membuat elemen <a> untuk mengunduh gambar
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = 'negative_image.jpg';

  // Simulasi klik pada elemen <a>
  link.click();

  // Membersihkan objek URL
  URL.revokeObjectURL(blobUrl);
};
</script>

<style scoped></style>


<!-- <template>
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
src/composables/image -->
