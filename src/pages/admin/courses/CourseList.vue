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
import CourseModal from "@/widgets/course-modal/index.vue";
import VButton from "@/shared/ui/v-button/index.vue";


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
  orderPosition: number,
  topics: ITopic[]
}

export interface ICourse {
  id?: number,
  name: string,
  createdDate?: string,
  modules: IModule[],
  teacher?: IUser,
  contextType: string
}

const router = useRouter()
const courses = ref([])
const is_loading = ref(false)
const isShow = ref(false)
const editIndex = ref<number>(-1)
const currentTitle = computed(() => editIndex.value == -1 ? 'Добавить' : 'Редактировать')
const contexts = ref([
  {name: 'Full context', value: 'FULL_CONTEXT'},
  {name: 'Half context', value: 'HALF_CONTEXT'},
  {name: 'Third context', value: 'THIRD_CONTEXT'},
  {name: 'No context', value: 'NO_CONTEXT'}
])

const defaultItem = {
  id: 0,
  name: null,
  contextType: "Choose a context"
}
const editedItem = ref({
  id: 0,
  name: null,
  contextType: "Choose a context"
})

const addItem = () => {
  editIndex.value = -1
  editedItem.value = Object.assign({}, defaultItem)
  isShow.value = true
}

const editItem = (row: any) => {
  editIndex.value = row.id
  editedItem.value = Object.assign({
    id: row.id,
    name: row.name,
    contextType: row.contextType
  })
  isShow.value = true
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

const onSubmitCourse = async () => {
  try {
    if (editIndex.value == -1) {
      const response = axiosInstance.post('admin/subjects')
      await getCourseList();
    } else {
      const response = axiosInstance.put('admin/subjects', {
        ...editedItem.value,
        id: editedItem.value.id
      })
    }

  } catch (e){
    console.error(e)
  }

}

const toCoursePage = (row: any) => {
  const course_id = row?.id
  router.push({name: 'AdminCoursesDetails', params: {id: course_id}})
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
      :show="isShow"
      @close="isShow = false"
  >
    <template #header>
      {{ currentTitle }}
    </template>
    <template #body>
      <div class="text-xl mb-3">Название курса</div>
      <div class="flex gap-12">
        <v-input v-model="editedItem.name" type="text"/>
        <div class="w-52">
          <v-select v-model="editedItem.contextType" :context="contexts"/>
        </div>
      </div>
    </template>
    <template #footer>
      <v-button @click="onSubmitCourse" type="secondary" size="sm">Сохранить</v-button>
    </template>
  </v-modal>
</template>

<style scoped>

</style>