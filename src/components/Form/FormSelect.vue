<template>
  <div class="relative" ref="select">
    <!--  SELECTED OPTION  -->
    <div
      class="bg-white rounded px-3 py-2 cursor-pointer flex items-center justify-between"
      :class="selectedOptionStyles"
      @click="toggleSelect"
    >
      <slot name="selectedOption" :value="value">
        <div v-if="!value">Select</div>
        <div v-else>{{ value[labelKey] || value }}</div>
        <slot name="chevron">
          <span
            class="transition-all duration-200 inline-block"
            :class="{ 'rotate-180': showOptions }"
          >
            ^
          </span>
        </slot>
      </slot>
    </div>

    <!--  OPTIONS  -->
    <Transition name="select">
      <div
        v-if="showOptions"
        :key="showOptions"
        class="absolute top-full w-full bg-white z-10 translate-y-3 overflow-auto max-h-[300px] datalist"
      >
        <slot name="options">
          <div
            v-for="(option, idx) in options"
            :key="idx"
            :class="{ 'bg-blue-300': isActive(option) }"
            class="transition-all duration-200 px-3 py-2 cursor-pointer datalist__option"
            @click="onSelect(option)"
          >
            <slot name="option" :option="option" :index="idx">
              <div>{{ option[labelKey] }}</div>
            </slot>
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

type TOption = string | number | { [key: string]: string | number }

export interface Props {
  modelValue: TOption
  options: TOption[]
  labelKey: string
  valueKey: string
  selectedOptionStyles: string
}
const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'id',
})

const emit = defineEmits<{
  (e: 'on-toggle', value: boolean): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'get-coords', value: Array<any>): void
}>()

const showOptions = ref(false)

function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue
  emit('on-toggle', showOptions.value)
}

function findOption(option: TOption) {
  return props?.options?.find(
    (o) => o === option || o[props.valueKey] === option
  )
}

const value = ref(findOption(props.modelValue))
function onSelect(option: TOption) {
  value.value = option
  toggleSelect(false)
  emit('update:modelValue', option[props.valueKey] || option)
  emit('get-coords', option?.coords)
}

const select = ref()
if (typeof window !== 'undefined') {
  onClickOutside(select, () => toggleSelect(false))
}

function isActive(option: TOption) {
  return (
    option === value.value ||
    value.value?.id === option?.id ||
    option?.id === value.value
  )
}
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.datalist {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 4px 44px rgba(56, 56, 56, 0.16);
  border-radius: 10px;
  left: 0;
  right: 0;
  z-index: 1;
  max-height: 250px;
  padding: 0;
}

.datalist_scroll {
  overflow-y: scroll;
}

.datalist_scroll::-webkit-scrollbar {
  width: 4px;
}

.datalist_scroll::-webkit-scrollbar-track {
  background: #e6e6e6;
  margin: 16px 0;
  position: relative;
  z-index: 2;
  border-radius: 10px;
}

.datalist_scroll::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 10px;
  border: 2px solid #c4c4c4;
}

.datalist__option {
  padding-left: 16px;
  max-height: 56px;
  padding-right: 16px;
  transition: all ease 0.3s;
  border-bottom: 1px solid #efefef;
  font-size: 14px;
  font-weight: 600;
}

.datalist__option:hover {
  background: #f2f3f5;
  color: #383838;
}
</style>
