<script lang="ts">
export default {
  name: 'auth-page'
}
</script>
<template>
  <div class="flex justify-between max-w-screen-xl mx-auto px-1 gap-x-14 pt-2 md:px-16 md:pt-52 ">
    <div class="w-1/2 hidden md:block">
      <h1 class="mb-6 text-3xl font-bold">Vanres</h1>
      <div class="mb-6">
        <h2 class="text-xl mb-0.5 font-bold">Lorem ipsum</h2>
        <p class="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="mb-6">
        <h2 class="text-xl mb-0.5 font-bold">Lorem ipsum</h2>
        <p class="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="mb-6">
        <h2 class="text-xl mb-0.5 font-bold">Lorem ipsum</h2>
        <p class="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
    <div class="w-full md:w-1/2 bg-gray-800 h-full rounded-lg">
      <div class="p-8 mx-auto">
        <h1 class="font-bold text-2xl mb-5">Welcome back</h1>
        <div class="flex justify-between gap-4 flex-col md:flex-row">
          <v-button type="secondary" full-width size="lg">Edu</v-button>
          <v-button type="secondary" full-width size="lg">Test</v-button>
        </div>

        <div class="mt-12">
          <div>
            <label class="text-sm font-bold mx-2" for="email">Email</label>
            <v-input v-model="email" class="mt-2" type="email" placeholder="Email" />
          </div>
          <div class="mt-4">
            <label class="text-sm font-bold mx-2" for="password">Password</label>
            <v-input v-model="password" class="mt-2" type="password" placeholder="Password" />
          </div>
        </div>
        <div class="flex justify-between mt-6">
          <div class="flex gap-2">
            <input type="checkbox">
            <div>Remember me</div>
          </div>
          <RouterLink to="/" class="text-blue-700 font-semibold">
            Forgot password?
          </RouterLink>
        </div>
        <div class="mt-6">
          <v-button @click="authorize" type="primary" size="lg" full-width>Sign in to your account</v-button>
        </div>
        <div class="flex mt-6 text-sm gap-2">
          <p>Don't have an account yet?</p>
          <RouterLink to="/" class="text-blue-700 font-semibold">
            Sign up here
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/plugins/user.ts";
import {ref, watch} from "vue";
import VButton from "@/shared/ui/v-button/index.vue";
import VInput from "@/shared/ui/v-input/index.vue";



const router = useRouter()
const store = useUserStore()
const {LOGIN_USER} = store
const {user} = storeToRefs(store)

const is_loading = ref(false)
const email = ref("")
const password = ref("")
const error = ref("")


const authorize = async() => {
  is_loading.value = true
  error.value = ''
    const data = await LOGIN_USER({
      email: email.value,
      password: password.value
    })
    handleRouteChange(data?.appRole.name)
}

const handleRouteChange = (role: string) => {
  const routeName = {
    'ROLE_STUDENT': 'student-courses',
    'ROLE_ADMIN': 'AdminCourses',
    'ROLE_MANAGER': 'manager-teachers',
    'ROLE_TEACHER': 'teacher-groups'
  }[role]
  if(role) {router.push({
    name: routeName
  })}
}



watch(user, (newValue) => {
  if(newValue) handleRouteChange(newValue.appRole.name)
})



</script>


<style scoped lang="scss">

</style>