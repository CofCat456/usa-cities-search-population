<script setup lang="ts">
import { type CityData } from '@/_interface'
import { getHeightText, numberWithCommas } from '@/utils'
import { inject, type Ref } from 'vue'

defineProps<{
  inputText: string
  cities: CityData[]
}>()

const initialList = ['Filter For A City', 'Or A State']

const citiesUlRef: Ref<HTMLHeadElement> | undefined = inject('citiesUlRef')
</script>

<template>
  <ul id="searchCities" ref="citiesUlRef" class="flex-1 overflow-y-auto overflow-x-hidden pr-4">
    <template v-if="inputText.length">
      <li
        v-for="city in cities"
        :key="city.rank"
        class="option hover:bg-gray-400/10 after:hover:w-full"
      >
        <p v-html="getHeightText(`${city.city}, ${city.state}`, inputText)" />
        <span class="hidden text-sm text-comment md:inline-block">{{
          numberWithCommas(Number(city.population))
        }}</span>
      </li>
    </template>
    <template v-else>
      <li v-for="item in initialList" :key="item" class="option first:mt-4">
        {{ item }}
      </li>
    </template>
  </ul>
</template>

<style scoped>
#searchCities::-webkit-scrollbar {
  width: 8px;
}

#searchCities::-webkit-scrollbar-thumb {
  border-radius: 9999px;
  background-color: theme('colors.gray.700');
}

#searchCities::-moz-scrollbar {
  width: 8px;
}

#searchCities::-moz-scrollbar-thumb {
  background-color: theme('colors.gray.700');
}

.option {
  @apply relative flex cursor-auto items-center justify-between rounded-[4px] p-4 text-base transition-colors after:absolute after:bottom-[-2px] after:left-1/2 after:h-[2px] after:w-10 after:-translate-x-1/2 after:bg-gray-500/30 after:transition-all after:duration-500 after:ease-in-out after:content-[''];
}
</style>
