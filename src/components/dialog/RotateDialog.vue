<template>
  <div>
    <q-dialog v-model="dialogState.rotateDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Rotate image</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="degrees" label="Derajat" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" @click="handleRotate" color="primary" v-close-popup />
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

const { $state: dialogState } = useDialogStore();
const { rotateImage } = useImageStore()
const { loading } = useQuasar()
const { push: routerPush } = useRouter();
const degrees = ref<number>(0);

const handleRotate = async () => {
  try {
    loading.show({
      message: 'Merotasi citra...'
    })
    await rotateImage(degrees.value)
    dialogState.rotateDialogChange = !dialogState.rotateDialogChange;
    dialogState.rotateDialogChange = !dialogState.rotateDialogChange;
    routerPush({ name: 'RotatePage' })
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
}
</script>

<style scoped></style>
