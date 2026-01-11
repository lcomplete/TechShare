<template>
  <span v-if="type === 'span'">{{ globalWords }}</span>
  <SvgBadge v-else-if="type === 'badge'" label="Words" :value="globalWords" :color="'#ff69b4'" />
  <SvgBadge
    v-else-if="type === 'updated'"
    label="Release"
    :value="'v1.0.' + updateDate.replace(/-/g, '')"
    :color="'#9cf'"
  />
  <span v-else-if="type === 'updatedText'">{{ updateDate }}</span>
  <span v-else-if="type === 'total'">{{ totalPageRoot }}</span>
  <span v-else-if="type === 'finish'">{{ finishPage }}</span>
  <Badge v-else :text="globalWordsText" />
</template>

<script setup>
import { computed } from 'vue'
import { usePageData, usePagesData, useThemeData } from '@vuepress/client'
import Badge from '@vuepress/theme-default/lib/client/components/Badge.vue'
import SvgBadge from './SvgBadge.vue'

const props = defineProps({
  chapter: String,
  type: String
})

const page = usePageData()
const pages = usePagesData()
const theme = useThemeData()

const globalWords = computed(() => {
  const statistics = page.value.readingTime?.globalWords || {}
  let words = 0
  Object.keys(statistics).forEach((key) => {
    if (props.chapter && key.startsWith(props.chapter)) {
      words += statistics[key]
    }
  })
  return words.toLocaleString()
})

const globalWordsText = computed(() => `字数: ${globalWords.value} 字`)

const updateDate = computed(() => {
  const rootPage = pages.value.find((item) => item.path === '/')
  return rootPage?.siteLastUpdated || ''
})

const finishPage = computed(() => {
  const statistics = page.value.readingTime?.globalWords || {}
  let count = 0
  Object.keys(statistics).forEach((key) => {
    if (props.chapter && key.startsWith(props.chapter) && statistics[key] > 100) {
      count += 1
    }
  })
  return count
})

const totalPageRoot = computed(() => {
  const totalPage = (sidebar) => {
    let count = 0
    sidebar.forEach((item) => {
      if (typeof item === 'string') {
        count += 1
        return
      }
      if (item.link) {
        count += 1
      }
      if (item.children) {
        count += totalPage(item.children)
      }
    })
    return count
  }

  const sidebar = theme.value.sidebar || []
  return totalPage(sidebar) + 2
})
</script>

<style scoped>
</style>
