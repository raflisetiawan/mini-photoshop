<template>
  <div>
    <OperationGroup />
    <ArithmeticGroup />
    <GeometriGroup />
    <FilterGroup />
    <EdgeDetectionGroup />
    <HistogramGroup />
    <OtherGroup />
  </div>
</template>

<script setup lang="ts">
import OperationGroup from './OperationGroup.vue';
import ArithmeticGroup from './ArithmeticGroup.vue';
import GeometriGroup from './GeometriGroup.vue';
import FilterGroup from './FilterGroup.vue';
import EdgeDetectionGroup from './EdgeDetectionGroup.vue';
import HistogramGroup from './HistogramGroup.vue';
import OtherGroup from './OtherGroup.vue';
</script>

<style scoped></style>
