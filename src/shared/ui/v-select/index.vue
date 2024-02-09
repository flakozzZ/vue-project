<script lang="ts">
export default {
  name: 'v-select'
}
</script>

<template>
  <select id="countries" v-model="selectedValue"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected disabled>Choose a context</option>
    <option v-for="item in props.context" :value="item.value" :key="item.value">{{ item.name }}</option>
  </select>
</template>

<script setup lang="ts">
interface ISelect {
  name: string
  value: string
}

interface Props {
  context: ISelect[]
}

const selectedValue = defineModel({default: "Choose a context"})

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped>

</style>