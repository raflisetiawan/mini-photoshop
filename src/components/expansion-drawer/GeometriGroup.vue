<template>
  <q-expansion-item expand-separator icon="architecture" label="Operasi Geometri">
    <q-card class="q-py-md">
      <div class="row full-width justify-start">
        <div class="col-5 q-mb-md">
          <q-btn icon="satellite" label="Translasi" @click="toggleTranslationDialog" flat size="sm">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn icon="rotate_left" label="Rotate" @click="toggleRotateDialog" flat size="sm">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn icon="flip" label="Flipping" flat size="sm" @click="toggleFlipDialog">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn icon="zoom_out_map" label="Zooming" flat size="sm" :to="{ name: 'ZoomImagePage' }">
            <!-- @click="toggleZoomDialog" -->
          </q-btn>
        </div>
      </div>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { useDialogStore } from 'src/stores/dialog';

const { toggleTranslationDialog, toggleRotateDialog, toggleFlipDialog, toggleZoomDialog } = useDialogStore()
</script>

<style scoped></style>
