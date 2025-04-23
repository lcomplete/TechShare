const fs = require('fs')
const path = require('path')
const { logger } = require('@vuepress/shared-utils')
const RSS = require('rss')
const cheerio = require('cheerio')

module.exports = (
  {
    filter = () => true,
    hostname = '',
    count = 10,
    selector = 'body',
    language = 'zh-CN',
    username = '',
  },
  ctx
) => ({
	name:'rss-feed',
  async generated(pagePaths) {
    if (!ctx.isProd) {
      return
    }
    logger.wait('Generate rss.xml...')
    const { pages, sourceDir, outDir } = ctx
    const siteData = require(path.resolve(sourceDir, '.vuepress/config.js'))
    const feed = new RSS({
      title: siteData.title,
      description: siteData.description,
      feed_url: `${hostname}/rss.xml`,
      site_url: hostname,
      copyright: `${username} ${new Date().getFullYear()}`,
      language,
    })
    pages
      .filter(filter)
      .map((page) => ({
        ...page,
        date: new Date(page.frontmatter.date || ''),
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
                  page.path
                    .replace(/\/$/, '/index.html')
                    .replace(/[^\.html]$/, '.html')
                )
                const htmlContent = fs.readFileSync(
                  decodeURIComponent(outFilePath),
                  'utf8'
                )
                const $ = cheerio.load(htmlContent, { decodeEntities: false })
                $('.header-anchor').remove()
								$('h1').eq(0).remove()
								$(".sr-only").remove()
								$("a svg").remove()
                $(selector)
                  .find('img')
                  .each(function () {
                    const src = $(this).attr('src')
                    if (!/^(https?:)?\/\//.test(src)) {
                      $(this).attr('src', hostname + src)
                    }
                  })
                return $(selector).html()
              })(),
            },
          },
        ],
      }))
      .forEach((page) => feed.item(page))
    fs.writeFile(
      path.join(outDir, 'rss.xml'),
      feed.xml({ indent: true }),
      (error) => error && console.error(error)
    )
  },
})