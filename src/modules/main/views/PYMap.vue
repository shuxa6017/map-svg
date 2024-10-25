<template>
  <div>
    <button class="p-4 text-center text-base bg-amber-100 hover:bg-amber-300 transition-300 rounded-lg mt-4 ml-4" @click="router.push('/')">map svg</button>
    <div class="flex my-4 flex-col md:flex-row md:items-center md:space-x-4">
      <div class="w-full">
        <FormSelect
            v-model="address"
            label-key="title"
            value-key="title"
            selected-option-styles="!p-0"
            :options="options"
            @get-coords="getCoords"
            class="mt-2 w-full rounded-lg"
        >
          <template #selectedOption>
            <FormInput
                input-class="rounded-lg"
                v-model="address"
                placeholder="enter_address_delivery"
            />
          </template>
        </FormSelect>
      </div>
    </div>
    <YMap
        markerLoc="/images/location-carts.svg"
        :navigatorClass="'!right-6'"
        mapClass="rounded-lg !overflow-hidden border border-gray-500"
        v-model="map"
        @update:modelValue="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import YMap from "@/components/YMap.vue";
import { ref, watch, computed } from "vue";
import FormInput from "@/components/Form/FormInput.vue";
import FormSelect from "@/components/Form/FormSelect.vue";
import router from "@/router.ts";

const map = ref<any>([69.26, 41.31]);
const longitude = ref()
const latitude = ref()
const address = ref()

watch(
    () => map.value,
    () => {
      longitude.value = map.value[0]
      latitude.value = map.value[1]
      axios
          .get(
              `https://maps-dev.commeta.io/nominatim/reverse?lat=${latitude.value}&lon=${longitude.value}&format=json`
          )
          .then((res) => {
            address.value = res?.data?.display_name;
          });
    },
    {
      deep: true,
    }
);

const getCoords = (e: Array<any>) => {
  map.value = [e[0], e[1]];
};

const updateValue = (a: string[]) => {
  map.value = a;
};

const options = computed(() => {
  const res = ref([]);
  if (mapOptions.value?.length) {
    res.value = mapOptions.value.map((el) => {
      return {
        title: el?.display_name,
        coords: [el?.lon, el?.lat],
      };
    });
    return res.value;
  }
  return mapOptions.value;
});

watch(
    () => address.value,
    (newValue) => {
      if (newValue) {
        axios
            .get(
                `https://maps-dev.commeta.io/nominatim/search?q=${newValue}&format=json&addressdetails=1&limit=5`
            )
            .then((res) => {
              mapOptions.value = res?.data;
            });
      }
    }
);

const mapOptions = ref([]);
</script>
