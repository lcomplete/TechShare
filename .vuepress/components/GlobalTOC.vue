<template>
  <div>
    <div v-if="level === 0" class="updateInfo not-print">
      标记显示出
      <select style="height: 23px;" v-model="updateDays">
        <option value="0" selected>当天</option>
        <option value="3">3天</option>
        <option value="7">7天</option>
        <option value="30">1月</option>
        <option value="180">半年</option>
        <option value="99999">全部</option>
      </select>
      内更新的内容
    </div>
    <ol>
      <li v-for="page in information" :key="page.links || page.title">
        <span v-if="page.links != null">
          <a :href="page.links">
            <span :class="'level' + level">{{ page.title }}</span>
          </a>
          <div class="not-print" style="display: inline-block">
            <Badge type="error" v-if="checkUpdate(page)">
              {{ page.update === 0 ? '当天更新' : page.update + '天前更新' }}
            </Badge>
          </div>
          <span class="words">{{ page.words }}</span>
        </span>
        <span v-else :class="'level' + level">
          {{ page.title }}
          <span class="words">{{ page.words }}</span>
        </span>
        <GlobalTOC
          v-if="page.children && page.children.length"
          :pages="page.children"
          :level="level + 1"
          :showDays="showDays ?? updateDays"
        />
      </li>
    </ol>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { usePagesData, useThemeData } from '@vuepress/client'
import Badge from '@vuepress/theme-default/lib/client/components/Badge.vue'
import moment from 'moment'

const normalizePath = (value = '') => value.replace(/\/$/, '')

const resolvePage = (pages, link) => {
  if (!link) return null
  const target = normalizePath(link)
  return pages.find((page) => normalizePath(page.path) === target) || null
}

export default defineComponent({
  name: 'GlobalTOC',
  components: {
    Badge
  },
  props: {
    pages: {
      type: [Array, String],
      default: null
    },
    level: {
      type: Number,
      default: 0
    },
    showDays: {
      type: Number,
      default: undefined
    }
  },
  setup(props) {
    const updateDays = ref(0)
    const pagesData = usePagesData()
    const themeData = useThemeData()

    const items = computed(() => {
      const origin = props.pages
        ? props.pages === '/'
          ? themeData.value.sidebar || []
          : props.pages
        : themeData.value.sidebar || []

      return origin.map((item) => {
        const normalizedItem = typeof item === 'string' ? { link: item } : item
        const page = normalizedItem.link
          ? resolvePage(pagesData.value, normalizedItem.link)
          : normalizedItem
        return {
          ...(page || {}),
          children: normalizedItem.children || []
        }
      })
    })

    const getTitle = (page) => {
      try {
        return page.title?.replace('✔️ ', '') || '标题错误'
      } catch (error) {
        return '标题错误'
      }
    }

    const getWords = (page) => {
      if (page?.readingTime?.words) {
        return `${page.readingTime.words.toLocaleString()} 字　`
      }
      return ''
    }

    const getLinks = (page) => (page?.readingTime?.words > 100 ? page.path : null)

    const getUpdate = (page) => {
      if (!page?.lastUpdated) return Number.POSITIVE_INFINITY
      const lastDay = new moment(page.lastUpdated, 'L')
      return Math.floor(-1 * moment.duration(lastDay.diff(new Date())).asDays())
    }

    const information = computed(() =>
      items.value.map((item) => ({
        title: getTitle(item),
        words: getWords(item),
        links: getLinks(item),
        update: getUpdate(item),
        lastUpdated: item.lastUpdated,
        children: item.children || []
      }))
    )

    const checkUpdate = (page) => page.update <= Math.max(updateDays.value, props.showDays ?? 0)

    return {
      updateDays,
      information,
      checkUpdate
    }
  }
})
</script>

<style scoped>
  ol {
    padding: 0 0 0 20px;
    margin: 0;
    list-style: none;
    counter-reset: a;
  }

  li:before {
    counter-increment: a;
    content: counters(a, ".") ". ";
    line-height: 35px;
  }

  .words {
    font-size: 14px;
    color: #999;
    float: right;
  }

  .level0 {
    font-size: 17px;
    line-height: 44px;
    font-weight: bold;
  }

  .updateInfo {
    text-align: right;
    margin: 0 10px 20px 0;
    color: #666;
    font-size: 14px;
  }
</style>
