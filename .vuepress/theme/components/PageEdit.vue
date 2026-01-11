<template>
  <footer class="page-edit">
    <div v-if="editLink" class="edit-link">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
      <OutboundLink />
    </div>
    <div v-if="showGitStar" class="git-hub-star">
      <span class="prefix" v-if="pageWords > 0">
        <github-button
          href="https://github.com/lcomplete/TechShare"
          data-icon="octicon-star"
          data-show-count="true"
          aria-label="Star lcomplete/TechShare on GitHub"
          style="position: relative; top: 4px; right: -4px;"
        >
          Star
        </github-button>
      </span>
    </div>
    <div v-if="lastUpdated" class="last-updated">
      <span class="prefix" v-if="pageWords > 0">总字数:</span>
      <span class="words" v-if="pageWords > 0">{{ pageWords.toLocaleString() }}</span>
      <span class="prefix" v-if="pageWords > 0">字　</span>
      <span class="prefix">{{ lastUpdatedText }}:</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { usePageData, usePageFrontmatter, useThemeData, useThemeLocaleData } from '@vuepress/client'

const page = usePageData()
const frontmatter = usePageFrontmatter()
const themeData = useThemeData()
const themeLocale = useThemeLocaleData()

const endingSlashRE = /\/$/
const outboundRE = /^[a-z]+:/i

const lastUpdated = computed(() => page.value.lastUpdated)

const pageWords = computed(() => page.value.readingTime?.words ?? 0)

const lastUpdatedText = computed(() => {
  if (typeof themeLocale.value.lastUpdatedText === 'string') {
    return themeLocale.value.lastUpdatedText
  }
  if (typeof themeData.value.lastUpdatedText === 'string') {
    return themeData.value.lastUpdatedText
  }
  return 'Last Updated'
})

const editLinkText = computed(() =>
  themeLocale.value.editLinkText || themeData.value.editLinkText || 'Edit this page'
)

const showGitStar = computed(
  () => !frontmatter.value.githubStar && frontmatter.value.githubStar !== false
)

const editLink = computed(() => {
  const showEditLink =
    frontmatter.value.editLink ?? themeData.value.editLink ?? themeData.value.editLinks

  const { repo, docsDir = '', docsBranch = 'master', docsRepo = repo } = themeData.value
  const filePath = page.value.filePathRelative

  if (showEditLink && docsRepo && filePath) {
    return createEditLink(repo, docsRepo, docsDir, docsBranch, filePath)
  }
  return null
})

const createEditLink = (repo, docsRepo, docsDir, docsBranch, filePath) => {
  const bitbucket = /bitbucket.org/
  if (bitbucket.test(repo)) {
    const base = outboundRE.test(docsRepo) ? docsRepo : repo
    return (
      base.replace(endingSlashRE, '') +
      `/src` +
      `/${docsBranch}/` +
      (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
      filePath +
      `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
    )
  }

  const base = outboundRE.test(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`
  return (
    base.replace(endingSlashRE, '') +
    `/edit` +
    `/${docsBranch}/` +
    (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
    filePath
  )
}
</script>

<style lang="stylus">
  @require '../styles/wrapper.styl'

  .page-edit
    @extend $wrapper
    padding-top 1rem
    padding-bottom 1rem
    overflow auto

    .git-hub-star
      display inline-block
      font-weight 400
      color lighten($textColor, 25%)

    .edit-link
      display inline-block

      a
        color lighten($textColor, 25%)
        margin-right 0.25rem

    .last-updated
      float right
      font-size 0.9em

      .prefix
        font-weight 500
        color lighten($textColor, 25%)

      .time
        font-weight 400
        color #aaa

      .words
        font-weight 400
        color #aaa

  @media (max-width: $MQMobile)
    .page-edit
      .edit-link
        margin-bottom 0.5rem

      .last-updated
        font-size 0.8em
        float none
        text-align left
</style>
