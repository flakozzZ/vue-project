<script lang="ts">
export default {
  name: 'v-input'
}
</script>

<template>
  <div class="field">
    <input
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model.trim="model"
        class="field__input">
  </div>
</template>

<script setup lang="ts">


interface Props {
  type: 'text' | 'password' | 'email' | 'url'
  placeholder?: string
  disabled?: boolean
  bgColor?: string
  autocomplete?: boolean
}

 defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

withDefaults(defineProps<Props>(), {
  autocomplete: true
})
const model = defineModel()



</script>

<style scoped src="./index.scss">

</style>