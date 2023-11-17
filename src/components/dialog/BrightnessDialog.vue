<template>
  <q-dialog v-model="dialogState.brightnessDialog">
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Nilai Kecerahan</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-slider v-model="brightnessValue" :min="-100" :max="100" label />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="handleBrightness" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useImageStore } from 'src/stores/image';
import { useDialogStore } from 'stores/dialog';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { push: routerPush } = useRouter();
const { adjustBrightness } = useImageStore()
const { $state: dialogState } = useDialogStore();
const brightnessValue = ref(0);

const handleBrightness = async () => {
  try {
    await adjustBrightness(brightnessValue.value / 100);
    dialogState.brightnessDialog = false;
    routerPush({ name: 'BrightnessPage' })
  } catch (error) {
    throw error;
  }
}
</script>

<style scoped></style>
