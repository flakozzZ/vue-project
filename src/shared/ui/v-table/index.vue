<script lang="ts">
export default {
  name: 'v-table'
}
</script>

<template>


  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <template v-for="header in headers" :key="header.key">
          <th class="px-6 py-3" v-if="header.key !== 'actions'" :key="header.key">
            <slot :name="header.key" :column="header">{{ header.label }}</slot>
          </th>
          <th
              v-else
              :key="headers.key"
          >
            <slot :name="header.key" :column="header">{{ header.label }}</slot>
          </th>
        </template>
      </tr>
      </thead>
      <tbody>
      <template v-for="(row, i ) in items" :key="`row${i}`">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <template v-for="column in headers">
            <td class="px-6 py-4 text-xl" v-if="column.key !== 'actions'" :key="column.key">
              <slot :name="`key-${column.key}`" :data="row[column.key]" :row="row">
                <span>{{ row[column.key] }}</span>
              </slot>
            </td>
            <td
                v-else-if="column.key === 'actions'"
                class="px-6 py-4 text-xl"
                :key="column.key"
            >
              <slot :name="`key-${column.key}`" :row="row"/>
            </td>
          </template>
        </tr>
      </template>
      <tr v-if="addingItems">
        <td @click="addItem" class="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <span class="flex items-center gap-2 text-xl px-6 py-3 cursor-pointer">
              <icon class="icon" name="add" />
              Добавить
            </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">

import Icon from "@/shared/ui/icon/index.vue";

export interface ILabel {
  key: string,
  label?: string,
}


export interface ITable {
  headers: ILabel[]
  items: any[]
  addingItems: boolean
}


withDefaults(defineProps<ITable>(), {
  addingItems: false
})

const emit = defineEmits(['addItem'])
const addItem = () => emit('addItem')


</script>

<style scoped>

</style>