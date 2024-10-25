<template>
  <div :class="mapClass" class="h-[600px] relative">
    <yandex-map
        v-model="map"
        cursor-grab
        :coords="center"
        class="map w-full"
        :settings="{
        location: {
          center,
          zoom,
        },
        theme: 'light',
        showScaleInCopyrights: true,
      }"
    >
      <yandex-map-marker
          v-for="(marker, index) in markers"
          :key="index"
          :settings="{ coordinates: marker.coordinates }"
      >
        <img
            src="/images/location-mark.svg"
            class="pin"
            alt="location-mark"
        />
      </yandex-map-marker>
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-listener :settings="{ onClick: logMapClick }" />
    </yandex-map>
    <div class="container !relative">
      <div
          :class="navigatorClass"
          class="absolute right-4 bottom-6 flex flex-col gap-2"
      >
        <div
            class="p-1.5 hover:bg-orange group transition-300 bg-white rounded-lg border cursor-pointer border-gray-400 hover:border-orange size-8 flex justify-center items-center"
            @click="zoom++"
        >
          <span
              class="icon-plus text-orange group-hover:text-orange-600 transition-300 text-[20px]"
          />
        </div>
        <div
            class="p-1.5 bg-white hover:bg-orange group transition-300 rounded-lg border cursor-pointer border-gray-400 hover:border-orange size-8 flex justify-center items-center"
            @click="zoom--"
        >
          <span
              class="icon-minus text-orange group-hover:text-orange-600 transition-300 text-[20px]"
          />
        </div>
        <div
            class="p-1.5 bg-white hover:bg-orange group transition-300 rounded-lg border cursor-pointer border-gray-400 hover:border-orange size-8 flex justify-center items-center"
            @click="getCurrentLocation"
        >
          <span
              class="icon-gps text-orange group-hover:text-orange-600 transition-300 text-[20px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  YandexMap,
  YandexMapMarker,
  YandexMapListener,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
} from 'vue-yandex-maps'
import {onMounted, ref, shallowRef, watch} from 'vue'
import type { DomEventHandler } from '@yandex/ymaps3-types'

interface Props {
  markerLoc?: string
  navigatorClass?: string
  mapClass?: string
  modelValue?: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: object): void
}>()
const map = shallowRef(null)
const center = ref(props.modelValue)
const zoom = ref(10)
const markers = ref([
  {
    id: 1,
    coordinates: props.modelValue,
  },
])
const isYandexLoaded = ref(false)
onMounted(() => {
  // Ensure Yandex Maps initializes
  isYandexLoaded.value = true;
})

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords
          center.value = [longitude, latitude]
          markers.value = [{ id: 1, coordinates: center.value }]
        },
        (error) => {
          console.error('Error getting location: ', error)
        }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}
// function onClick(e: any) {
// try {
//  if (process.client) {
//    console.log('fnrhgfre')
//   let cords = e?.get('coords')
//    console.log()
//    console.log(e?.get('coords'))
//     center.value = [cords[0], cords[1]]
//       emit('update:modelValue', center.value)
//     }
//  } catch (err) {}
// }
// function onMarkerClick(address: string | undefined) {
//   try {
//     if (process.client && address) {
//       coords.value = [address.latitude, address.longitude]
//      emit('update:modelValue', coords.value)
//   }
//  } catch (err) {}
// }

const logMapClick: DomEventHandler = (object, event) => {
  let cords = event.coordinates
  center.value = [cords[0], cords[1]]
  markers.value = [{ id: 1, coordinates: center.value }]
  emit('update:modelValue', center.value)
}
watch(props, () => {
  if (props.modelValue !== center.value) {
    center.value = props.modelValue
    markers.value = [{ id: 1, coordinates: center.value }]
  }
})
</script>

<style>
.cluster {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: black;
  color: #fff;
  border-radius: 100%;
  cursor: pointer;
  border: 2px solid black;
  outline: 2px solid black;
}

.fade-in {
  animation: fadeIn 0.3s;
}
.pin {
  cursor: pointer;
  max-width: 28px;
  width: 32px; /* imageSize width */
  height: 32px; /* imageSize height */
  transform: translate(-16px, -32px); /* imageOffset (x, y) */
  display: inline-block;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.ymaps3x0--map-copyrights {
  display: none !important;
}
</style>
