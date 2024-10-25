<template>
  <div
    class="inline-flex items-center transition-300 relative bg-gray-500 rounded-lg border overflow-hidden w-full h-11"
  >
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :id="id"
      class="font-medium w-full text-base text-dark bg-transparent flex-grow py-2.5 px-3 outline-none"
      ref="Input"
      @keyup.enter="handleEnter"
      @input="handleInput"
      @focus="handleFocus"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'

export interface Props {
  placeholder?: string
  modelValue: number | string
  id?: string
  autoFocus?: boolean
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'focusout'): void
  (e: 'focus'): void
  (e: 'enter'): void
}>()

const handleInput = (e: { target: HTMLInputElement }) => {
  emit('update:modelValue', e.target.value)
}
const handleEnter = () => {
  emit('enter')
}
const Input = ref()
defineExpose({ Input })

const props = defineProps<Props>()

const handleFocus = (e: Event) => {
  emit('focus')
  const target = e.target as HTMLInputElement
  target.removeAttribute('readonly')
}

watch(
  () => props.autoFocus,
  (newValue) =>
    setTimeout(() => {
      if (newValue) {
        Input.value?.focus()
      }
    }, 300),
  { immediate: true }
)
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
