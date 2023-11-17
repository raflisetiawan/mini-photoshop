<template>
  <div id="binary-page">
    <div class="q-pa-md">
      <div class="row">
        <div class="text-h5">Hasil Rotasi citra</div>
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

const { rotateImageName, $state } = useImageStore();
const { $state: dialogState } = useDialogStore()
const imageUrl = ref('');
const { loading } = useQuasar();

const getImage = async () => {
  return await api.get(`image/${$state.rotateImageName}`);
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

onMounted(fetchImage);

watchEffect(() => {
  // Watch for changes in rotateImageName and fetch the new image
  if (dialogState.rotateDialogChange !== null) fetchImage();
});

const handleSave = async () => {
  const blob = await fetch(imageUrl.value).then((r) => r.blob());
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = 'binary_image.jpg';
  link.click();
  URL.revokeObjectURL(blobUrl);
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
</script>

<style scoped></style>
