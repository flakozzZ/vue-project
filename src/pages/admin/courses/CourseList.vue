<script setup lang="ts">
import {useRouter} from "vue-router";
import VTable from "@/shared/ui/v-table/index.vue";
import axiosInstance from "@/app/providers/axios.ts";
import {computed, onMounted, ref} from "vue"
import type {IUser} from "@/plugins/user.ts";
import Icon from "@/shared/ui/icon/index.vue";
import VModal from "@/shared/ui/v-modal/index.vue";
import VInput from "@/shared/ui/v-input/index.vue";
import VSelect from "@/shared/ui/v-select/index.vue";
import VButton from "@/shared/ui/v-button/index.vue";
import VDropdown from "@/shared/ui/v-dropdown/index.vue";


const headers = [
  {
    key: 'name',
    label: 'Название',
  },
  {
    key: 'createdDate',
    label: 'Дата',
  },
  {
    key: 'modules',
    label: 'Модуль',
  },
  {
    key: 'topicsCount',
    label: 'Темы',
  },
  {
    key: 'actions',
    label: 'Изменить'
  },
  // {
  //   key: 'parameters',
  //   label: 'Информация о курсах'
  // }
]

export interface ITest {
  id: number,
  name: string,
  deadline: string,
  status: string
}

export interface ITask {
  id: number,
  name: string,
  description: string,
  deadline: string,
  status: string
}

export interface ITopic {
  id: number,
  appTest: ITest,
  name: string,
  task: ITask,
  description: string,
  orderPosition: number,
}

export interface IModule {
  id?: number,
  name: string,
  orderPosition?: number,
  topics: ITopic[]
}

export interface ICourse {
  id?: number,
  name: string | null,
  createdDate?: string,
  modules: IModule[],
  teacher?: IUser,
  contextType: string
}

const TOPIC_BODY = {
  name: '',
  description: ''
}

const MODULE_BODY = {
  name: '',
  topics: [{...TOPIC_BODY}]
}

const INITIAL_DATA = {
  name: "",
  description: "",
  contextType: 'NO_CONTEXT',
  modules: [{...MODULE_BODY}],
}


const router = useRouter()
const courses = ref([])
const is_loading = ref(false)
const isModalOpened = ref(false)
const editIndex = ref<number>(-1)
// const course_data = reactive<ICourse>(structuredClone(INITIAL_DATA))
const currentTitle = computed(() => editIndex.value == -1 ? 'Добавить' : 'Редактировать')
const contexts = ref([
  {name: 'Full context', value: 'FULL_CONTEXT'},
  {name: 'Half context', value: 'HALF_CONTEXT'},
  {name: 'Third context', value: 'THIRD_CONTEXT'},
  {name: 'No context', value: 'NO_CONTEXT'}
])


const editedItem = ref({
  id: 0,
  name: null,
  contextType: "NO_CONTEXT",
  modules: [{...MODULE_BODY}]
})


const addItem = () => {
  editIndex.value = -1
  // Object.assign(course_data, structuredClone(INITIAL_DATA))
  editedItem.value = Object.assign(structuredClone(INITIAL_DATA))
  console.log(editedItem.value)
  isModalOpened.value = true
}

const editItem = (row: any) => {
  editIndex.value = row.id
  editedItem.value = Object.assign(row)
  // course_data.id = row.id
  // course_data.name = row.name
  // course_data.contextType = row.contextType
  // course_data.modules = row?.modules.length === 0 ? [structuredClone(MODULE_BODY)] : row?.modules
  isModalOpened.value = true
}
const getCourseList = async () => {
  is_loading.value = true
  try {
    const {data} = await axiosInstance.get("admin/subjects")
    courses.value = (data ?? []).map((subject: ICourse) => {
      return {
        ...subject,
        topicsCount: (subject.modules ?? []).reduce((acc, module) => module.topics.length + acc, 0)
      }
    })
  } catch (err) {
    console.error(err)
    throw err
  } finally {
    is_loading.value = false
  }
}

// const onSubmitCourse = async () => {
//   try {
//     const url = 'admin/subjects'
//     const payload = {
//       ...(course_data.id && ({id: course_data.id})),
//       name: course_data.name,
//       contextType: course_data.contextType,
//       modules: course_data.modules.map((module, idx) => ({
//         ...module,
//         topics: module.topics.map((topic, tIdx) => ({...topic, orderPosition: tIdx})),
//         orderPosition: idx
//       }))
//     }
//     if(editIndex.value === -1) await axiosInstance.post(url, payload)
//     else await axiosInstance.put(url, payload)
//     await getCourseList()
//     isModalOpened.value = false
//   } catch (e) {
//     console.error(e)
//   }
//
// }

const onSubmitCourse = async () => {
  try {
    const url = 'admin/subjects'
    const payload = {
      ...(editedItem.value.id && ({id: editedItem.value.id})),
      name: editedItem.value.name,
      contextType: editedItem.value.contextType,
      modules: editedItem.value.modules.map((module, idx) => ({
        ...module,
        topics: module.topics.map((topic, tIdx) => ({...topic, orderPosition: tIdx})),
        orderPosition: idx
      }))
    }
    if (editIndex.value === -1) await axiosInstance.post(url, payload)
    else await axiosInstance.put(url, payload)
    await getCourseList()
    isModalOpened.value = false
  } catch (e) {
    console.error(e)
  }

}

const toCoursePage = (row: any) => {
  const course_id = row?.id
  router.push({name: 'AdminCoursesDetails', params: {id: course_id}})
}


const addEmptyModule = () => {
  editedItem.value.modules = [...editedItem.value.modules, {...MODULE_BODY, topics: [{...TOPIC_BODY}]}]
}

const removeModule = (id: number) => {
  editedItem.value.modules = editedItem.value.modules.filter((module, index) => index !== id)
}

const addEmptyTopic = (id: number) => {
  editedItem.value.modules[id].topics = [...editedItem.value.modules[id].topics, {...TOPIC_BODY}]
}

const removeTopic = (module_id: number, topic_id: number) => {
  editedItem.value.modules[module_id].topics = editedItem.value.modules[module_id].topics.filter((topic, index) => index !== topic_id)
}
const isDropdownOpened = ref(Array(editedItem.value.modules.length).fill(false))

const toggleDropdown = (id: number) => {
  isDropdownOpened.value[id] = !isDropdownOpened.value[id]
}

onMounted(getCourseList)


</script>

<template>
  <div class="text-2xl mb-6">Все курсы</div>
  <v-table
      :headers="headers"
      :items="courses"
      @addItem="addItem"
      adding-items>
    <template #key-modules="{row}">
      {{ row.modules.length }}
    </template>
    <template #key-actions="{row}">
      <div class="flex gap-2">
        <div class="cursor-pointer flex gap-3">
          <Icon
              @click="editItem(row)"
              class="icon"
              name="edit"/>
          <Icon
              @click="toCoursePage(row)"
              class="icon"
              name="arrow-right"/>
        </div>
      </div>
    </template>
  </v-table>
  <v-modal
      :show="isModalOpened"
      @close="isModalOpened = false"
  >
    <template #header>
      {{ currentTitle }}
    </template>
    <template #body>
      <div class="text-xl mb-3">Название курса</div>
      <div class="flex gap-12 mb-2">
        <v-input v-model="editedItem.name" type="text"/>
        <div class="w-52">
          <v-select v-model="editedItem.contextType" :context="contexts"/>
        </div>
      </div>
      <div class="flex items-center justify-between bg-gray-700 p-2 rounded my-3">
        <div class="text-base ml-3">Модули</div>
        <v-button @click="addEmptyModule" size='md' type="primary">
          <i class="pi pi-plus "/>
        </v-button>
      </div>
      <div v-for="(module, mIdx) in editedItem.modules" :key="`module-${mIdx}`">
        <div class="flex justify-between items-center border border-gray-600 rounded p-3">
          <div class="w-2/3">
            <v-input type="text" v-model="module.name"/>
          </div>
          <div class="flex">
            <i @click="removeModule(mIdx)"
               class="pi pi-trash cursor-pointer rounded hover:bg-gray-600 p-2 transition"/>
            <i @click="toggleDropdown(mIdx)" class="pi cursor-pointer p-2 rounded hover:bg-gray-600 transition" :class="{'pi-plus': !isDropdownOpened[mIdx], 'pi-minus': isDropdownOpened[mIdx]}"/>
          </div>
        </div>
        <VDropdown :show="isDropdownOpened[mIdx]">
        <div class="border border-gray-600 rounded p-3">
          <div v-for="(module, tIdx) in module.topics" :key="`module-${mIdx}-topic-${tIdx}`">
              <div class="flex justify-between items-center">
                <div>Темы</div>
                <v-button @click="addEmptyTopic(mIdx)" type="primary" size="md">Добавить</v-button>
              </div>
              <div class="flex justify-between items-center">
                <div class="mb-3 w-2/3">
                  <v-input v-model="module.name" class="mb-2" type="text"/>
                  <textarea v-model="module.description" rows="4"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Описание темы"></textarea>
                </div>
                <i @click="removeTopic(mIdx, tIdx)" class="pi pi-trash cursor-pointer rounded hover:bg-gray-600 p-2 transition"></i>
              </div>
            </div>
        </div>
        </VDropdown>
      </div>
    </template>
    <template #footer>
      <v-button @click="onSubmitCourse" type="secondary" size="lg">Сохранить</v-button>
    </template>
  </v-modal>
</template>

<style scoped>

</style>