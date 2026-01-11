import fs from 'fs'
import path from 'path'
import { logger } from '@vuepress/utils'
import RSS from 'rss'
import { load } from 'cheerio'

const resolveSiteData = (app) => {
  if (app.siteData && app.siteData.value) {
    return app.siteData.value
  }
  return app.siteData || {}
}

const resolveOutDir = (app) => {
  if (app.dir && typeof app.dir.dest === 'function') {
    return app.dir.dest()
  }
  return app.options?.dest || app.dir?.dest || process.cwd()
}

const rssFeedPlugin = (
  {
    filter = () => true,
    hostname = '',
    count = 10,
    selector = 'body',
    language = 'zh-CN',
    username = ''
  } = {}
) => ({
  name: 'rss-feed',
  async onGenerated(app) {
    if (!app.env?.isProd) {
      return
    }

    logger.wait('Generate rss.xml...')

    const { pages } = app
    const outDir = resolveOutDir(app)
    const siteData = resolveSiteData(app)

    const feed = new RSS({
      title: siteData.title,
      description: siteData.description,
      feed_url: `${hostname}/rss.xml`,
      site_url: hostname,
      copyright: `${username} ${new Date().getFullYear()}`,
      language
    })

    pages
      .filter(filter)
      .map((page) => ({
        ...page,
        date: new Date(page.frontmatter.date || '')
      }))
      .sort((a, b) => b.date - a.date)
      .slice(0, count)
      .map((page) => ({
        title: page.frontmatter.title,
        description: page.frontmatter.description,
        url: `${hostname}${page.path}`,
        date: new Date(page.frontmatter.date),
        custom_elements: [
          {
            'content:encoded': {
              _cdata: (() => {
                const outFilePath = path.join(
                  outDir,
                  page.path.replace(/\/$/, '/index.html').replace(/[^\.html]$/, '.html')
                )
                const htmlContent = fs.readFileSync(decodeURIComponent(outFilePath), 'utf8')
                const $ = load(htmlContent, { decodeEntities: false })
                $('.header-anchor').remove()
                $('h1').eq(0).remove()
                $('.sr-only').remove()
                $('a svg').remove()
                $(selector)
                  .find('img')
                  .each(function () {
                    const src = $(this).attr('src')
                    if (!/^(https?:)?\/\//.test(src)) {
                      $(this).attr('src', hostname + src)
                    }
                  })
                return $(selector).html()
              })()
            }
          }
        ]
      }))
      .forEach((page) => feed.item(page))

    fs.writeFile(path.join(outDir, 'rss.xml'), feed.xml({ indent: true }), (error) => {
      if (error) {
        console.error(error)
      }
    })
  }
})

export default rssFeedPlugin
