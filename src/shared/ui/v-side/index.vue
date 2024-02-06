<script lang="ts">
export default {
  name: "v-side"
}
</script>

<template>
  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <RouterLink
          v-for="item in menu_items"
          :key="item.icon"
          :to="{name: item.routeName}"
          v-show="item.routeName"
          >
          <div class="flex gap-2 items-center px-2 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <div>
<!--              <img style="fill: white !important;" :src="`/_nuxt/assets/icons/${item.icon}.svg`" :alt="item.icon" width="24" height="24">-->
              <Icon class="icon" :name="item.icon" />
            </div>
            <div>{{item.label}}</div>
          </div>
        </RouterLink>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {computed, defineAsyncComponent} from "vue";
import {useUserStore} from "@/plugins/user.ts";
import Icon from "@/shared/ui/icon/index.vue";

const ADMIN_MENU_ITEMS = [
  {label: 'Добавить менеджера', icon: 'add_user', routeName: ''},
  {label: 'Добавить учителя', icon: 'student', routeName: ''},
  {label: 'Добавить класс', icon: 'user_group', routeName: ''},
  // { label: 'Оқушылар', icon: 'user_list', routeName: 'ManagerStudentList' },
  // { label: 'Онлайн тесттер', icon: 'test', routeName: 'AdminOnlineTestList' },
  {label: 'Добавить курс', icon: 'graduation_cap', routeName: 'AdminCourses'},
  // { label: 'Тест қосу', icon: 'exam', routeName: 'AdminTestList' },
  {label: 'Добавить профессию', icon: 'star', routeName: ''},
  {label: 'Добавить ВУЗ', icon: 'plus', routeName: ''},
  {label: 'Новости', icon: 'newspaper', routeName: ''},
]

const MANAGER_MENU_ITEMS = [
  {label: 'Добавить ученика', icon: 'plus', routeName: ''},
  {label: 'Все ученики', icon: 'user_group', routeName: ''},
  {label: 'Мои ученики', icon: 'user_circle', routeName: ''},
]

const TEACHER_MENU_ITEMS = [
  {label: 'Главная страница', icon: 'star', routeName: ''},
  {label: 'Профиль', icon: 'user', routeName: ''},
  {label: 'Классы', icon: 'user_group', routeName: ''},
  // { label: 'Тапсырмалар', icon: 'pencil', routeName: 'TeacherTask' },
  // { label: 'Бағалар', icon: 'text_check', routeName: 'TeacherGrade' },
  // { label: 'Аналитика', icon: 'analytics', routeName: 'TeacherAnalytics' },
]

const STUDENT_MENU_ITEMS = [
  {label: 'Курсы', icon: 'star', routeName: ''},
  {label: 'Профиль', icon: 'user', routeName: ''},
  {label: 'Успеваемость', icon: 'bookmark', routeName: ''},
  {label: 'Вопрос - Ответ', icon: 'question', routeName: ''},
  {label: 'Новости', icon: 'globe', routeName: ''},
  {label: 'ВУЗ', icon: 'graduation_cap', routeName: ''},
  // { label: 'Сыныптар', icon: 'user_group', routeName: 'TeacherGroupList' },
  // { label: 'Тапсырмалар', icon: 'pencil', routeName: 'TeacherTask' },
  // { label: 'Бағалар', icon: 'text_check', routeName: 'TeacherGrade' },
  // { label: 'Аналитика', icon: 'analytics', routeName: 'TeacherAnalytics' },
]
const router = useRouter()
const store = useUserStore()
const {LOGOUT_USER} = store
const {user} = storeToRefs(store)

const menu_items = computed(() => {
  if (!user.value?.appRole?.name) return []
  const items: string = {
    "ROLE_ADMIN": ADMIN_MENU_ITEMS,
    "ROLE_MANAGER": MANAGER_MENU_ITEMS,
    "ROLE_TEACHER": TEACHER_MENU_ITEMS,
    "ROLE_STUDENT": STUDENT_MENU_ITEMS
  }[user.value?.appRole?.name] || []
  return items
})


const getIcon = (name: string) => {
  return defineAsyncComponent(() => import(`@/shared/assets/icons/sidebar/${name}.svg`))
}
const logout = () => {
  LOGOUT_USER()
  router.push('/')
}
</script>

<style scoped>

</style>