
<template>
  <div :class="[
      'modal-container',
      props.show ? 'visible' : 'hidden'
  ]" id="crud-modal" tabindex="-1" aria-hidden="true">
    <div class="relative p-4 w-full max-w-4xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <slot name="header"></slot>
<!--            <img @click="$emit('close')" class="cursor-pointer" alt="icon" src="~/assets/icons/close.svg" width="36" height="36" >-->
          </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <slot name="default">
          </slot>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
interface Props {
  show: boolean
}

const props = withDefaults(defineProps<Props>(), {})

defineEmits(['close'])
</script>
<style scoped>
.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease; /* добавляем переход для свойства opacity */
  opacity: 0; /* начальное значение непрозрачности */
}

.visible {
  opacity: 1; /* значение непрозрачности для видимого состояния */
}

.hidden {
  opacity: 0; /* значение непрозрачности для скрытого состояния */
  pointer-events: none; /* чтобы элемент был невидимым для пользовательских событий при скрытии */
}
</style>