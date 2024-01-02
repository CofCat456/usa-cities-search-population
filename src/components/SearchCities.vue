<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { Status, type CityData } from '@/_interface'
import { TriangleIcon } from '@/assets'
import ResultBox from './ResultBox.vue'
import CitiesUl from './CitiesUl.vue'
import SearchInput from './SearchInput.vue'
import { isElementAtBottom } from '@/utils'

const { VITE_API_URL } = import.meta.env

const inputText = ref('')
const status = ref<Status>()
const isScroll = ref(false)
const citiesUlRef = ref<HTMLUListElement>()
const cities = ref<CityData[]>([])

provide('citiesUlRef', citiesUlRef)

const getStatusText = computed(() => {
  if (status.value === Status.LOAD) return '載入中 ...'
  if (status.value === Status.NORESULT) return '查無資料 !!!'
  if (status.value === Status.ERR) return '連線錯誤 !?'
  if (status.value === Status.PROHIBIT) return '禁止輸入空格 !'

  return undefined
})

const fetchCities = async (text: string) => {
  status.value = Status.LOAD

  try {
    const res = await fetch(VITE_API_URL)
    const data = await res.json()

    if (res.status === 200) {
      const regex = new RegExp(text, 'gi')

      cities.value = data.filter(
        (citiesdata: CityData) => citiesdata.city.match(regex) || citiesdata.state.match(regex)
      )

      if (cities.value.length === 0) status.value = Status.NORESULT;
      else status.value = undefined

    } else {
      status.value = Status.ERR
      return []
    }
  } catch {
    throw Error('API 有問題')
  }
}

function handleScroll() {
  citiesUlRef.value?.addEventListener('scroll', () => {
    if (isElementAtBottom(citiesUlRef.value as HTMLElement)) isScroll.value = false
    else isScroll.value = true
  })
}

function clearInputText() {
  inputText.value = ''
}

watch([citiesUlRef, () => [...cities.value]], async () => {
  if (!citiesUlRef.value) return
  if (cities.value.length === 0) return (isScroll.value = false)

  // 等待資料渲染完成
  await nextTick()

  const { offsetHeight, scrollHeight } = citiesUlRef.value
  if (offsetHeight !== scrollHeight) isScroll.value = true
  else isScroll.value = false
})

watch(inputText, (newText) => {
  if (inputText.value.length > 0 && inputText.value.trim() === '') return status.value = Status.PROHIBIT
  if (inputText.value.length === 0 || inputText.value.trim() === '') {
    cities.value = []
    return status.value = undefined
  }

  fetchCities(newText)
})

onMounted(async () => {
  await nextTick()

  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    class="relative flex h-[100dvh] w-full max-w-full flex-col px-4 py-10 sm:max-w-screen-sm sm:px-0 md:h-[600px] md:max-w-screen-md md:py-0"
  >
    <!-- 標題 -->
    <h1 class="mb-8 text-center text-3xl">🇺🇸 美國人口查詢</h1>

    <!-- 輸入框 -->
    <SearchInput
      v-model:inputText="inputText"
      @clear="clearInputText"
    />

    <!-- 查詢筆數 -->
    <p v-if="inputText.trim().length" class="my-4">
      <template v-if="status === Status.LOAD || status === Status.ERR">
        {{ status === Status.ERR ? '沒資料' : '載入中資料中...' }}
      </template>
      <template v-else>
        查詢到 <span class="text-highlight-2">{{ cities.length }}</span> 筆項目
      </template>
    </p>

    <!-- 查詢列表 -->
    <CitiesUl :input-text="inputText" :cities="cities" />

    <!-- 狀態結果顯示 -->
    <ResultBox :status="status" :text="getStatusText" />

    <!-- 滾動提示 -->
    <div
      v-if="isScroll"
      class="absolute bottom-3 left-1/2 -translate-x-1/2 animate-bounce sm:bottom-0"
    >
      <TriangleIcon class="h-5 w-5 rotate-180" />
    </div>
  </div>
</template>
