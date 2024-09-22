<template>
  <router-view v-slot="{ Component }">
    <div :key="detectLayout">
      <component :is="detectLayout">
        <Component :is="Component"/>
      </component>
    </div>
  </router-view>
</template>

<script setup lang="ts">
import LDefault from '@/layouts/LDefault.vue'
import {computed} from 'vue'
import {useRoute} from 'vue-router';

const route = useRoute()


const layouts = new Map<any, any>()

// *** You can set below another Layout components
layouts.set('default', LDefault)

const detectLayout = computed(() => {
  return layouts.get(route.meta.layout) || LDefault
})
</script>

