<template>
  <router-view />
  <BrightnessDialogVue />
  <AddImageDialog />
  <TranslateImageDialog />
  <RotateDialog />
  <FlipDialog />
  <ZoomDialog />
  <FilterMedianDialog />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';
import BrightnessDialogVue from './components/dialog/BrightnessDialog.vue';
import AddImageDialog from './components/dialog/AddImageDialog.vue';
import TranslateImageDialog from './components/dialog/TranslateImageDialog.vue';
import RotateDialog from './components/dialog/RotateDialog.vue';
import FlipDialog from './components/dialog/FlipDialog.vue';
import ZoomDialog from './components/dialog/ZoomDialog.vue';
import FilterMedianDialog from './components/dialog/FilterMedianDialog.vue';
import * as cv from '@techstark/opencv-js';
window.cv = cv;

const { dark } = useQuasar();

watch(() => dark.isActive, (val) => {
  LocalStorage.set('dark', val)
});
</script>

<style></style>
