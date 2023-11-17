<template>
  <q-dialog v-model="dialogState.addImageDialog">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">{{ dialogState.isSubtractImage ? 'Pengurangan' : 'Penjumlahan' }} citra</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-file outlined v-model="image" label="Upload gambar yang ingin ditambah">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn @click="onOk" flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useImageStore } from 'src/stores/image';
import { useDialogStore } from 'stores/dialog'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { push: routerPush } = useRouter();
const image = ref()
const { loading } = useQuasar()
const { addImages, uploadImage2, subtractImage } = useImageStore()

const { $state: dialogState } = useDialogStore()

const onOk = async () => {
  if (!dialogState.isSubtractImage) {
    try {
      loading.show({
        message: 'Menambahkan citra gambar...'
      })
      const imageName = await uploadImage2(image.value)
      await addImages(imageName)
      routerPush({ name: 'AddImagePage' });
    } catch (error) {

    } finally {
      loading.hide();
    }
  } else {
    try {
      loading.show({
        message: 'Mengurangi citra gambar...'
      })
      const imageName = await uploadImage2(image.value)
      await subtractImage(imageName)
      routerPush({ name: 'SubtractImagePage' });
    } catch (error) {
      throw error;
    } finally {
      loading.hide();
    }
  }
}



</script>

<style scoped></style>
