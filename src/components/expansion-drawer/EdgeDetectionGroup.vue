<template>
  <q-expansion-item expand-separator icon="show_chart" label="Operasi Deteksi Tepi">
    <q-card class="q-py-md">
      <div class="row full-width justify-around">
        <div class="col-5 q-mb-md">
          <q-btn outline @click="() => $state.edgeDetectionDialog = true" label="Canny" :to="{ name: 'CannyPage' }"
            size="md">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn outline @click="() => $state.edgeDetectionDialog = true" label="Prewitt" :to="{ name: 'PrewittPage' }"
            size="md">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn outline @click="() => $state.edgeDetectionDialog = true" :to="{ name: 'SobelPage' }" label="Sobel"
            size="md">
          </q-btn>
        </div>
      </div>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { useDialogStore } from 'src/stores/dialog';

const { $state } = useDialogStore()
</script>
