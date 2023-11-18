<template>
  <div>
    <div class="text-h5 q-mb-md">Informasi Citra:</div>
    <div class="row justify-center">
      <div class="col-2">
        Bit Per Pixel:
      </div>
      <div class="col-10">
        {{ imageState.imageInfo.bitsPerPixel }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-2">
        Ukuran Gambar:
      </div>
      <div class="col-10">
        {{ imageState.imageInfo.fileSize }} KB
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-2">
        Lebar:
      </div>
      <div class="col-10">
        {{ imageState.imageInfo.width }}
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-2">
        Tinggi:
      </div>
      <div class="col-10">
        {{ imageState.imageInfo.height }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useImageStore } from 'stores/image';

const { $state: imageState } = useImageStore();
</script>

<style scoped></style>
