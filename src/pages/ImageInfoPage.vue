<template>
  <div id="image-info-page">
    <div class="q-pa-md">
      <div class="row justify-center">
        <div class="col-12 text-center">
          <q-img @error="handleImageError()" :src="imageUrl" spinner-color="white"
            style="height: 140px; max-width: 150px" />
        </div>
      </div>
      <ImageInfoVue />
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useImageStore } from 'src/stores/image';
import ImageInfoVue from 'src/components/ImageInfo.vue';
import { useQuasar } from 'quasar';

const { imageName, $state: imageState } = useImageStore();
const imageUrl = ref('');
const { loading } = useQuasar()
onMounted(async () => {
  try {
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
    try {
      loading.show({ message: 'Mengambil Info gambar' })
      const response = await getImageInfo()
      imageState.imageInfo = response.data;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error
  } finally {
    loading.hide()
  }

});

const getImage = async () => {
  return await api.get(`image/${imageName}`);
};

const getImageInfo = async () => {
  return await api.get(`image/${imageName}/info`);
}

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
}
</script>

<style scoped></style>
