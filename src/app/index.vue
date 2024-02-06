<script lang="ts">
export default {
  name: 'App'
}
</script>


<template>
  <div class="app">
    <Suspense timeout="0">

    </Suspense>
  </div>
</template>


<script setup lang="ts">
import {defineAsyncComponent} from "vue";

const defaultLayout = defineAsyncComponent(() => import("@/app/layouts/default.vue"))
const emptyLayout = defineAsyncComponent(() => import("@/app/layouts/empty.vue"))
</script>


<style scoped>
</style>