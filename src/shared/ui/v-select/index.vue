<script setup lang="ts">

interface ISelect {
  name: string,
  value: string,
}
interface Props {
  context: ISelect[]
}

const props = withDefaults(defineProps<Props>(), {})
const selectedValue = defineModel()

</script>

<template>
  <select v-model="selectedValue" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected disabled>Choose a context</option>
    <option v-for="item in props.context" :key="item.value" :value="item.value">{{ item.name }}</option>
  </select>
</template>

<style scoped>

</style>