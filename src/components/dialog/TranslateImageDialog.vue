<template>
  <div>
    <q-dialog v-model="dialogState.translationDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Translasi citra</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="xOffset" label="X Offset" />
          <q-input v-model="yOffset" label="Y Offset" />
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

const { translateImage } = useImageStore()
const { push: routerPush } = useRouter();
const { $state: dialogState } = useDialogStore()
const { loading } = useQuasar()
const xOffset = ref<number>(0);
const yOffset = ref<number>(0);

const handleTranslation = async () => {
  try {
    loading.show({
      message: 'Mentranslasi citra...'
    })
    await translateImage(xOffset.value, yOffset.value)
    dialogState.translateDialogChange = !dialogState.translateDialogChange
    routerPush({ name: 'TranslateImagePage' })
  } catch (error) {
    throw error;
  } finally {
    loading.hide();
  }
}
</script>

<style scoped></style>
