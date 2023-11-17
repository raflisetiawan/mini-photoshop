<template>
  <div>
    <q-dialog v-model="dialogState.flipDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Flip image</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-radio v-model="axis" val="horizontal" label="Horizontal" />
          <q-radio v-model="axis" val="vertical" label="Vertical" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" @click="handleFlip" color="primary" v-close-popup />
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
const { flipImage } = useImageStore()
const { loading } = useQuasar()
const { push: routerPush } = useRouter();
const axis = ref<string>('horizontal');

const handleFlip = async () => {
  try {
    loading.show({
      message: 'Membalik citra...'
    })
    await flipImage(axis.value)
    routerPush({ name: 'FlippingPage' })
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
}
</script>

<style scoped></style>
