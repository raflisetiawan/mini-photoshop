<template>
  <div>
    <q-dialog v-model="dialogState.zoomDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Zoom citra</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="factor" label="Nilai factor" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat @click="handleTranslation" label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useImageStore } from 'src/stores/image';
import { useDialogStore } from 'stores/dialog'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { zoomImage } = useImageStore()
const { push: routerPush } = useRouter();
const { $state: dialogState } = useDialogStore()
const { loading } = useQuasar()
const factor = ref<number>(0);

const handleTranslation = async () => {
  try {
    loading.show({
      message: 'Memperbesar citra...'
    })
    await zoomImage(factor.value,)
    routerPush({ name: 'ZoomImagePage' })
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
}
</script>

<style scoped></style>
