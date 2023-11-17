<template>
  <div id="home-page">
    <div class="container q-pa-md">
      <div class="row justify-center q-mb-md">
        <div class="text-h4">Mini Photoshop</div>
      </div>
      <q-form @submit="handleUpload" enctype="multipart/form-data">
        <div class="row justify-center">
          <div class="col-md-6 col-sm-10 col-xs-12">
            <q-file outlined v-model="imageModel" counter label="" :input-style="{ height: '350px' }"
              @clear="onUpdateModel = false" @update:model-value="onUpdateModel = true">
              <template v-slot:label>
                <div class="label-container" :style="{ width: $q.screen.gt.sm ? '650px' : '300px', height: '300px' }">
                  <div
                    :class="onUpdateModel ? 'row justify-start items-center full-width full-height' : 'row justify-center items-center full-width full-height'">
                    <div class="text-h6">Upload File / Drag & Drop File<q-icon name="photo"></q-icon></div>
                  </div>
                </div>
              </template>
              <template v-slot:default v-if="onUpdateModel">
                <div class=" absolute-center">
                  <!-- Tampilkan gambar yang akan di-upload -->
                  <q-img class="q-mt-xl" :src="getUploadedImageUrl()" alt="Uploaded Image" fit="cover"
                    style="width: 300px; height: 300px;" />
                </div>
              </template>
            </q-file>
          </div>
        </div>
        <div class="row justify-center q-mt-md" v-if="onUpdateModel">
          <q-btn color="primary" type="submit">Upload</q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useImageStore } from 'stores/image';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const { push: routerPush } = useRouter();

const imageModel = ref();
const onUpdateModel = ref(false);
const { uploadImage } = useImageStore();
const { loading } = useQuasar()

// Fungsi untuk mendapatkan URL gambar yang akan di-upload
const getUploadedImageUrl = () => {
  if (imageModel.value) {
    return URL.createObjectURL(imageModel.value);
  }
  return ''; // Atau URL default jika tidak ada gambar yang di-upload
};

// Hapus URL objek saat komponen di-unmount
watch(onUpdateModel, (newVal) => {
  if (!newVal) {
    URL.revokeObjectURL(getUploadedImageUrl());
  }
});


const handleUpload = async () => {
  try {
    loading.show({
      message: 'Mengupload gambar...'
    })
    await uploadImage(imageModel.value)
    routerPush({ name: 'ImageInfoPage' })
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
}
</script>

<style scoped></style>
