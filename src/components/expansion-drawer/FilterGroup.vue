<template>
  <q-expansion-item expand-separator icon="blur_linear" label="Operasi Filter Citra">
    <q-card class="q-py-md">
      <div class="row full-width justify-start">
        <div class="col-5 q-mb-md">
          <q-btn icon="blur_on" @click="() => $state.filterMedian = true" label="Median Filter" flat size="sm">
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
