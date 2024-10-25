<template>
  <div>
    <button class="p-4 text-center text-base bg-amber-100 hover:bg-amber-300 transition-300 rounded-lg mt-4 ml-4" @click="router.push('/ymap')">YMap with search</button>
    <MapSection />
  </div>
</template>
<script setup lang="ts">
import MapSection from "@/components/MapSection.vue";
import router from "@/router.ts";
</script>