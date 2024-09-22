<template>
  <div class="flex bg-white-200 relative items-center flex-col py-16 md:min-h-[800px]">
    <div class="z-20 w-full container ">
      <h2 class="text-black w-full text-[32px] font-merriweather font-bold">
        map_title
      </h2>
      <div
          id="map-container"
          class="items-center flex flex-col mt-11 justify-center p-4 select-x w-full relative"
      >
        <MapSvg @handle-hover="handleHover" @hide-tooltip="hideTooltip" @handle-mouse-move="handleMouseMove"/>
      </div>

      <div class="flex gap-x-3 items-center">
        <div class="p-[7px] w-fit rounded-lg bg-green">
          <InlineSvg
              src="/images/icons/clock-white.svg"
              class="w-[18px] h-[18px] !stroke-white"
          />
        </div>
        <p class="text-black text-base font-semibold">
          map_description
        </p>
      </div>

      <!-- Tooltip Desktop -->
      <div
          v-if="!loading && showTooltip"
          :style="{ top: `${position.top}px`, left: `${position.left}px` }"
          class="z-50 pointer-events-none hidden md:block absolute w-fit rounded-lg bg-white px-3 py-2.5 -translate-x-1/2 translate-y-[-3rem] shadow-[0_10px_40px_0px_rgba(0,0,0,0.2)]"
      >
        <div class="relative">
          <div v-if="regionStatus">
            <div class="bg-white rounded-[10px] flex items-center gap-2">
              <div
                  class="p-[7px] w-fit rounded-lg"
                  :class="regionStatus?.region_online_users === 0 ? 'bg-red' : 'bg-green'"
              >
                <InlineSvg
                    src="/images/icons/clock-white.svg"
                    class="w-[18px] h-[18px] !stroke-white"
                />
              </div>
              <div class="flex gap-x-1 items-center">
                <p class="text-grey-600 text-base leading-tight tracking-wide">
                  regionCode
                </p>
                <div class="w-px h-full bg-red" />
                <p class="text-grey-600 text-xl leading-7 tracking-tight">
                  {{ regionStatus?.region_online_users }}
                </p>
              </div>
            </div>
          </div>

          <div v-else>
            <p>no_data</p>
          </div>

          <!-- Triangle -->
          <span
              :class="showTooltip && !loading && regionStatus ? '!bottom-[-31px]' : ''"
              class="absolute bottom-[-31px] left-1/2 -translate-x-1/2"
          >
            <svg
                class="size-[2rem]"
                viewBox="0 0 17 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.5 6L16.5 0H0.5L8.5 6Z" fill="white" />
            </svg>
          </span>
        </div>
      </div>

      <!-- Mobile Tooltip -->
      <div
          v-if="!loading && showTooltip"
          class="absolute md:hidden z-50 left-1/2 w-fit rounded-lg bg-white px-2 py-1.5 -translate-x-1/2 -translate-y-[-3rem]"
          :class="[{ 'top-52': !regionStatus }, { 'top-20': regionStatus }]"
      >
        <div class="relative">
          <div v-if="showTooltip && !loading && regionStatus">
            <div class="bg-white rounded-[10px] flex items-center gap-2">
              <div class="p-[7px] w-fit rounded-lg"
                   :class="regionStatus?.region_online_users === 0 ? 'bg-red' : 'bg-green'">
                <InlineSvg
                    src="/images/icons/clock-white.svg"
                    class="w-[10px] h-[10px] !stroke-white"
                />
              </div>
              <div class="flex gap-x-1 items-center">
                <p class="text-grey-600 text-base leading-tight tracking-wide ">regionCode</p>
                <div class="w-px h-full bg-red"/>
                <p class="text-grey-600 text-xl leading-7 tracking-tight ">
                  {{ regionStatus?.region_online_users }}</p>
              </div>
            </div>
          </div>

          <div v-else>
            <p>no_data</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onBeforeUnmount, reactive, ref} from 'vue'
import MapSvg from "@/components/MapSvg.vue";

const showTooltip = ref(false)
const selectedRegion = ref<string | null>(null)
const regionCode = ref('')
const loading = ref(false)
const position = reactive({
  left: 0,
  top: 0,
})
const regionStatus = ref(null)

// Handle hover over the region
const handleHover = (val: string) => {
  if (selectedRegion.value === val) return

  selectedRegion.value = val
  regionCode.value = val

  // Fetch region data

  // if (val) {
  //   loading.value = true
  //   apiService
  //       .get(`landing/RegionOnlineUsers/?region_code=uz-${val}`)
  //       .then((res: any) => {
  //         if (res) {
  //           regionStatus.value = res.data
  //         }
  //       })
  //       .catch(() => {
  //         regionStatus.value = null
  //       })
  //       .finally(() => {
  //         loading.value = false
  //       })
  // }

  showTooltip.value = true
}

// Update tooltip position based on mouse movement
const handleMouseMove = (event: MouseEvent) => {
  position.left = event?.layerX + 183
  position.top = event?.layerY + 147 // Adjust for tooltip height
}

// Hide the tooltip when mouse leaves the region
const hideTooltip = () => {
  showTooltip.value = false
  selectedRegion.value = null
}

// Event listener cleanup
onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>