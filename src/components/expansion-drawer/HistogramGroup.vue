<template>
  <q-expansion-item expand-separator icon="analytics" label="Histogram Citra">
    <q-card class="q-py-md">
      <div class="row full-width justify-start">
        <div class="col-5 q-mb-md">
          <q-btn icon="bar_chart" @click="handleGetHistogram" label="Histogram" flat size="sm">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn icon="insert_chart" @click="handleNormalizedGetHistogram" label="Normalize" flat size="sm">
          </q-btn>
        </div>
        <div class="col-5 q-mb-md">
          <q-btn icon="equalizer" @click="handleEqualizeHistogram" label="Equalized" flat size="sm">
          </q-btn>
        </div>
      </div>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { useImageStore } from 'stores/image'
import { useRouter } from 'vue-router';
const { getNormalizeHistogram, getHistogram, getEqualizeHistogram } = useImageStore();
const { push } = useRouter();

const handleGetHistogram = async () => {
  await getHistogram();
  push({ name: 'HistogramPage' })
}

const handleNormalizedGetHistogram = async () => {
  await getNormalizeHistogram();
  push({ name: 'NormalizePage' })
}
const handleEqualizeHistogram = async () => {
  await getEqualizeHistogram();
  push({ name: 'EqualizePage' })
}
</script>
