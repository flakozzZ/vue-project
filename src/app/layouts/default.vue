<script setup lang="ts">

import VHeader from "@/shared/ui/v-header/index.vue";
import VSide from "@/shared/ui/v-side/index.vue";
</script>

<template>
  <div>
    <v-header/>
    <v-side/>

    <div class="p-4 sm:ml-64">
      <div class="p-4 mt-14">
        <slot/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>