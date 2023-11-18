<template>
  <div>
    <q-dialog v-model="dialogState.filterMedian">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Filter median</div>
        </q-card-section>

        <q-form @submit="handleMedian">
          <q-card-section class="q-pt-none">
            <q-input :ref="kernelSizeRef" v-model="kernelSize" label="Ukuran Kernel" type="number" lazy-rules
              :rules="[value => (value % 2 !== 0) || 'Nilai harus angka ganjil']" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn type="submit" flat label="OK" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup lang="ts">
import { useImageStore } from 'src/stores/image';
import { useDialogStore } from 'stores/dialog'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { $state: dialogState } = useDialogStore()
const { push: routerPush } = useRouter();
const { filterMedian } = useImageStore()
const kernelSize = ref(3)
const kernelSizeRef = ref()

const handleMedian = async () => {
  dialogState.kernelSize = kernelSize.value
  dialogState.filterMedian = false;

  await filterMedian(dialogState.kernelSize);
  routerPush({ name: 'MedianPage' });
}
</script>
