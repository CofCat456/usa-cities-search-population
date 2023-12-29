<script lang="ts" setup>
import { CloseIcon } from '@/assets'
import { computed } from 'vue'

const props = defineProps<{
  inputText: string
  disabled: boolean
}>()

const emit = defineEmits<{
  clear: []
  'update:inputText': [text: string]
}>()

const inputText = computed({
  get: () => props.inputText,
  set: (text) => emit('update:inputText', text)
})
</script>

<template>
  <div class="relative">
    <input
      type="text"
      class="peer w-full rounded border border-gray-700 bg-transparent px-4 py-5 outline-none disabled:cursor-not-allowed"
      :disabled="disabled"
      placeholder=" "
      v-model="inputText"
    />
    <label
      class="absolute left-4 top-1/2 z-10 origin-[0] -translate-y-8 scale-[.85] transform text-base text-zinc-400 duration-150 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-8 peer-focus:scale-75"
    >
      City or State
    </label>
    <button
      v-if="inputText.length"
      type="button"
      class="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-comment transition-transform hover:scale-105"
      @click="$emit('clear')"
    >
      <CloseIcon />
    </button>
  </div>
</template>
