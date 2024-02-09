<script lang="ts">
export default {
  name: 'course-modal'
}
</script>
<template>
  <div class="text-xl mb-3">Название курса</div>
  <div class="flex gap-12">
    <v-input type="text"/>
    <div class="w-52">
      <v-select context=""/>
    </div>
  </div>
</template>

<script setup lang="ts">
import VInput from "@/shared/ui/v-input/index.vue";
import VSelect from "@/shared/ui/v-select/index.vue";
</script>


<style scoped>

</style>