<template>
  <div id="all-image">
    <div class="q-pa-md">
      <div class="text-h5 q-mb-md">Hasil semua gambar</div>
      <div class="row justify-around">
        <div class="col-3" v-for="(image, index) in imageUrl" :key="index">
          <q-img class="cursor-pointer" @click="handleImageClick(image)" @error="handleImageError()"
            :src="image.imageBlob" spinner-color="white" style="max-width: 200px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { useImageStore } from 'src/stores/image';
import { onMounted, ref } from 'vue';
import { AllImageData, AllImageUrl } from 'src/models/image'
import { useRouter } from 'vue-router';

const images = ref<AllImageData[]>([]);
const imageUrl = ref<AllImageUrl[]>([])
const { loading } = useQuasar()
const { $state } = useImageStore();
const { push: routerPush } = useRouter();

const getImages = async () => {
  const response = await api.get('image/all')

  images.value = response.data

  images.value.forEach((image: AllImageData) => {
    // Mengonversi Buffer menjadi Blob
    const blob = new Blob([new Uint8Array(image.file.data)], { type: 'image/jpeg' });
    // Membuat URL objek dari Blob
    imageUrl.value.push({ imageBlob: URL.createObjectURL(blob), name: image.name, imageBuffer: image.file.data })
  });

}

const handleImageClick = async (image: AllImageUrl) => {

  $state.imageName = image.name

  // Mengonversi Buffer menjadi Blob
  const blob = new Blob([new Uint8Array(image.imageBuffer)], { type: 'image/jpeg' });

  // Membuat objek File dari Blob
  const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

  $state.image = file;

  routerPush({ name: 'ImageInfoPage' })

}

onMounted(async () => {
  try {
    loading.show({ message: 'Mengambil gambar' })
    await getImages()
  } catch (error) {
    throw error;
  } finally {
    loading.hide()
  }
})
const handleImageError = async () => {
  try {
    loading.show({ message: 'Mengambil gambar' })
    await getImages()
  } catch (error) {
    throw error;
  } finally {
    loading.hide()
  }
};
</script>

<style scoped></style>
