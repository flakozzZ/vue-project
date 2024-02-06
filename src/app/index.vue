<script lang="ts">
export default {
  name: 'App'
}
</script>


<template>
  <div class="app">
    <Suspense timeout="0">
      <component :is="route.meta.sidebar ? defaultLayout : emptyLayout">
        <RouterView/>
      </component>
    </Suspense>
  </div>
</template>


<script setup lang="ts">
import {defineAsyncComponent, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useUserStore} from "@/plugins/user.ts";

const route = useRoute();
const store = useUserStore()
const {GET_USER} = store
const defaultLayout = defineAsyncComponent(() => import("@/app/layouts/default.vue"))
const emptyLayout = defineAsyncComponent(() => import("@/app/layouts/empty.vue"))

onMounted(() => {
  const token = window.localStorage.getItem('@access-token')
  if(token) GET_USER()
})


</script>


<style scoped>
</style>