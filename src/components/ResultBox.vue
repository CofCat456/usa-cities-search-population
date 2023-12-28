<script setup lang="ts">
import { SearchIcon, LoadingIcon, ErrorIcon } from '../assets'

import { Status } from '../_interface'

defineProps<{
  status?: Status
  text?: string
}>()
</script>

<template>
  <div id="resultBox" v-if="status" class="h-full flex flex-col items-center justify-center gap-6">
    <LoadingIcon v-if="status === Status.LOAD" class="animate-spin" />
    <SearchIcon v-else-if="status === Status.NORESULT" />
    <ErrorIcon v-else />
    <p v-if="text" class="text-3xl text-center">
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
#resultBox > svg {
  @apply w-40 aspect-square;
}
</style>
