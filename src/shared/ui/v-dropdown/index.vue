<script lang="ts">
export default {
  name: 'v-dropdown'
}
</script>

<template>
  <Transition name="slide">
    <div v-if="props.show">
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
.slide-enter-active {
  transition: max-height .3s ease-in;
  overflow: hidden;
}

.slide-leave-active {
  transition: max-height .2s ease-in-out;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 100vh;
}
</style>
