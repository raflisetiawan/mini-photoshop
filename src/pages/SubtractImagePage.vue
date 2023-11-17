<template>
  <div id="subtract-image-page">
    <div class="q-pa-md">
      <div class="row">
        <div class="text-h5">Hasil Konversi citra pengurangan</div>
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

const { subtractImageName, $state } = useImageStore();
const imageUrl = ref('');

const { loading } = useQuasar()
onMounted(async () => {
  await initImage()
});

watchEffect(async () => {
  console.log('ok');

  if (subtractImageName !== $state.subtractImageName) await initImage()
})

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
  return await api.get(`image/${$state.subtractImageName}`);
};

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
