<script setup lang="ts">
import VTable from "@/shared/ui/v-table/index.vue";
import axiosInstance from "@/app/providers/axios.ts";
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import VButton from "@/shared/ui/v-button/index.vue";
import type {IModule} from "@/pages/admin/courses/CourseList.vue";
import VModal from "@/shared/ui/v-modal/index.vue";


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
const isShow = ref(false)
const currentId = ref<string | string[]>(route.params.id)
const subjects = ref([])

const openModal = () => {
  isShow.value = true
}

const getSubjects = async () => {
  try {
    const {data} = await axiosInstance.get(`admin/subjects/${currentId.value}`)
    subject.name = data?.name
    subject.modules = data?.modules.map(subject_name => subject_name.name)
    subjects.value = data.modules
        .map(module => module.topics.map(topic => topic.name))
        .reduce((acc, topics) => acc.concat(topics), []);
  } catch (e) {
    console.error(e)
  }
}


onMounted(getSubjects)
</script>

<template>
  <div class="text-2xl mb-5">
    <router-link to="/admin/courses">
      <span>Все курсы</span>
    </router-link>
    >
    <span v-if="subject.name">{{ subject.name }}</span>
    <div class="flex flex-wrap gap-3 mt-4">
      <v-button size="sm" type="primary" v-for="module in subject.modules">{{ module }}</v-button>
    </div>
  </div>
  <v-table :headers="headers" :items="subjects">
    <template #key-name="{row}">
      {{ row }}
    </template>
    <template #key-test="{row}">
      <v-button @click="openModal" type="editable">Изменить</v-button>
    </template>
    <template #key-task="{row}">
      <v-button type="editable">Изменить</v-button>
    </template>
  </v-table>
  <v-modal :show="isShow" @close="isShow = false">

  </v-modal>
</template>

<style scoped>

</style>