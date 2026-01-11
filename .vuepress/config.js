import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import localTheme from './theme/index.js'
import readTimePlugin from './plugins/read-time/index.js'
import rssFeedPlugin from './plugins/rss-feed/index.js'

export default defineUserConfig({
  base: '/',
  title: 'lcomplete 的技术分享',
  description:
    '🌟 分享效率方法 🪄、优质文章 📑、编程知识 🎹、实用工具 🛠️ 和有趣内容 😄。💌 每周至少发送 1 篇 newsletter。',
  head: [
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/favicons/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicons/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/favicons/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/assets/favicons/site.webmanifest' }],
    ['link', { rel: 'shortcut icon', href: '/assets/favicons/favicon.ico' }],
    ['link', { rel: 'feed', href: '/rss.xml', type: 'application/rss+xml', title: 'lcomplete 的技术分享' }],
    ['link', { rel: 'alternate', href: '/rss.xml', type: 'application/rss+xml', title: 'lcomplete 的技术分享' }]
  ],
  bundler: viteBundler(),
  plugins: [
    searchPlugin(),
    readTimePlugin(),
    rssFeedPlugin({
      username: 'lcomplete',
      hostname: 'https://tech.codelc.com',
      selector: '.content__default',
      count: 50,
      filter: (page) => /^docs/.test(page.filePathRelative || '') && page.frontmatter.title
    })
  ],
  markdown: {
    anchor: { permalink: false },
    toc: { level: [2, 3] },
    extendMarkdown: (md) => {
      // md.use(require('markdown-it-mermaid').default)
      // md.use(require('markdown-it-sub'))
      // md.use(require('markdown-it-sup'))
      // md.use(require('markdown-it-abbr'))
      // md.use(require('markdown-it-ins'))
      // md.use(require('markdown-it-figure'))
      // md.use(require('markdown-it-smartarrows'))
      // md.use(require('markdown-it-fontawesome'))
    }
  },
  theme: localTheme({
    navbar: [
      { text: '关于', link: '/about/' },
      { text: '博客', link: 'https://codelc.com/' },
      { text: '推特', link: 'https://x.com/xlcomplete' },
      { text: '邮箱订阅', link: 'https://coolc.substack.com/' },
      { text: 'RSS 订阅', link: 'https://tech.codelc.com/rss.xml' },
      { text: 'GitHub', link: 'https://github.com/lcomplete/TechShare' }
    ],
    backToTop: true,
    lastUpdated: true,
    lastUpdatedText: '最后更新',
    sidebar: [
      {
        text: '野生架构师周刊',
        collapsible: false,
        children: [
          '/docs/letter/019',
          '/docs/letter/018',
          '/docs/letter/017',
          '/docs/letter/016_growup_01',
          '/docs/letter/015',
          '/docs/letter/014',
          '/docs/letter/013',
          '/docs/letter/012',
          '/docs/letter/011',
          '/docs/letter/010',
          '/docs/letter/009',
          '/docs/letter/008',
          '/docs/letter/007',
          '/docs/letter/006',
          '/docs/letter/005',
          '/docs/letter/004',
          '/docs/letter/003',
          '/docs/letter/002',
          '/docs/letter/001'
        ]
      },
      {
        text: 'Java',
        collapsible: false,
        children: [
          '/docs/java/俯瞰Java服务端开发',
          '/docs/java/part_one_of_java_engineer_path',
          '/docs/java/java_study_way',
          '/docs/java/liquibase',
          '/docs/java/unit_test',
          '/docs/java/api_error_handling',
          '/docs/java/spring_best_practice'
        ]
      },
      {
        text: '数据库',
        collapsible: false,
        children: ['/docs/db/mysql_standard']
      },
      {
        text: '软件工程',
        collapsible: false,
        children: ['/docs/engineering/devops', '/docs/engineering/gitflow']
      },
      {
        text: 'Javascript',
        collapsible: false,
        children: ['/docs/js/remotion', '/docs/js/lit_layui']
      },
      {
        text: '编程人生',
        collapsible: false,
        children: [
          '/docs/thinking/编码的道与禅',
          '/docs/thinking/程序员的职业素养',
          '/docs/thinking/coder_kpi',
          '/docs/thinking/quotes'
        ]
      },
      {
        text: '编程语言',
        collapsible: false,
        children: ['/docs/lang/使用prolog解决爱因斯坦斑马难题', '/docs/lang/一段简单的ruby爬虫代码']
      },
      {
        text: '效率',
        collapsible: false,
        children: [
          '/docs/10x/script',
          '/docs/10x/terminal',
          '/docs/tools/我的效率工具箱',
          '/docs/tools/n8n',
          '/docs/tools/mac_win_chapter_1'
        ]
      }
    ]
  })
})
