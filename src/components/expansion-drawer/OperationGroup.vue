<template>
  <q-expansion-item class="q-mt-lg" expand-separator icon="wallpaper" label="Operasi Pengolahan Citra" default-opened>
    <q-card class="q-py-md">
      <div class="row full-width justify-start">
        <div class="col-5 q-mb-md">
          <q-btn icon="grain" label="Biner" flat size="sm" @click="handleBinary">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn icon="contrast" label="Grayscale" @click="handleGrayscale" flat size="sm">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn icon="brightness_5" label="Brightness" @click="toggleBrightnessDialog()" flat size="sm">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn icon="remove" label="Negative" @click="handleNegative()" flat size="sm">
          </q-btn>
        </div>
      </div>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useDialogStore } from 'src/stores/dialog';
import { useImageStore } from 'src/stores/image';
import { useRouter } from 'vue-router';

const { loading } = useQuasar()
const { convertToGrayscale, convertToBinary, convertToNegative } = useImageStore()
const { push: routerPush } = useRouter();
const { toggleBrightnessDialog } = useDialogStore()

const handleBinary = async () => {
  try {
    loading.show({
      message: 'Mengkonversi menjadi gambar biner...'
    })
    await convertToBinary();
    routerPush({ name: 'BinaryPage' });
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
}
const handleGrayscale = async () => {
  try {
    loading.show({
      message: 'Mengkonversi menjadi gambar grayscale...'
    })
    await convertToGrayscale();
    routerPush({ name: 'GrayscalePage' });
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
}

const handleNegative = async () => {
  try {
    loading.show({
      message: 'Mengkonversi menjadi gambar grayscale...'
    })
    await convertToNegative();
    routerPush({ name: 'NegativePage' });
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
}


</script>

<style scoped></style>
