<script setup lang="ts">
import VTable from "@/shared/ui/v-table/index.vue";
import axiosInstance from "@/app/providers/axios.ts";
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import VButton from "@/shared/ui/v-button/index.vue";
import type {IModule} from "@/pages/admin/courses/CourseList.vue";


const headers = [
  {
    key: 'name',
    label: 'Название'
  },
  {
    key: 'test',
    label: "Тесты"
  },
  {
    key: 'task',
    label: 'Задания'
  }
]

interface ISubject {
  name: string,
  modules: IModule[]
}
const subject = reactive<ISubject>({
  name: '',
  modules: [],
})

const route = useRoute()
const currentId = ref<string | string[]>(route.params.id)
const subjects = ref([])

const getSubjects = async () => {
  try {
    const {data} = await axiosInstance.get(`admin/subjects/${currentId.value}`)
    console.log(data.modules.map(module=> module.topics.map(topic=>topic.name)))
    // subject.name = data?.name
    // subject.modules = data?.modules.map(subject_name => subject_name.name)
    // subjects.value = data.modules
    //     .map(module => module.topics.map(topic => topic.name))
    //     .reduce((acc, topics) => acc.concat(topics), []);
  } catch (e) {
    console.error(e)
  }
}



onMounted(getSubjects)
</script>

<template>
  <div class="text-2xl mb-5">
    <span>Все курсы</span>
    >
    <router-link to="/admin/courses">
      <span v-if="subject.name">{{subject.name}}</span>
    </router-link>
    <v-button class="mt-3" type="primary" v-for="module in subject.modules">{{module}}</v-button>
  </div>
  <v-table :headers="headers" :items="subjects">
    <template #key-name="{row}">
      {{row}}
    </template>
    <template #key-test="{row}">
      <v-button type="editable">edit</v-button>
    </template>
    <template #key-task="{row}">
      <v-button type="editable">edit</v-button>
    </template>
  </v-table>
</template>

<style scoped>

</style>