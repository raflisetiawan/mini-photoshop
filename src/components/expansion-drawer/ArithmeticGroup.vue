<template>
  <q-expansion-item expand-separator icon="exposure" label="Operasi Aritmatika">
    <q-card class="q-py-md">
      <div class="row full-width justify-start">
        <div class="col-5 q-mb-md">
          <q-btn icon="add" label="Penjumlahan" @click="toggleAddImageDialog(false)" flat size="sm">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn icon="remove" label="Pengurangan" @click="toggleAddImageDialog(true)" flat size="sm">
          </q-btn>
        </div>
      </div>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { useDialogStore } from 'src/stores/dialog';

const { toggleAddImageDialog } = useDialogStore();


</script>


<style scoped></style>
