<script lang="ts">
export default {
  name: "v-modal"
}
</script>

<template>
  <Transition name="modal">
  <div
      v-if="props.show"
      class="modal-mask"
      @click="$emit('close')"
  >
      <div v-if="props.show">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            {{props.title}}
            <icon class="close__icon mt-1 cursor-pointer" name="close" @click="$emit('close')" />
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
  </div>
  </Transition>

</template>

<script setup lang="ts">

import Icon from "@/shared/ui/icon/index.vue";

interface Props {
  show: boolean
  title: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  display: inline-block;
  width: auto;
  height: auto;
  margin: auto;
  padding: 20px 30px;
  background-color: rgb(31 41 55);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 0;
  font-size: 20px;
  color: #ffffff;
}

.modal-body {
  margin: 20px 0;
}

.close__icon {
  width: 36px;
  height: 36px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
