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

const generateRSS = (app, options) => {
  const { filter, hostname, count, selector, language, username } = options
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
              let htmlContent;
              if (app.env?.isBuild) {
                const outFilePath = path.join(
                  outDir,
                  page.path.replace(/\/$/, '/index.html').replace(/[^\.html]$/, '.html')
                )
                if (fs.existsSync(decodeURIComponent(outFilePath))) {
                  htmlContent = fs.readFileSync(decodeURIComponent(outFilePath), 'utf8')
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
                  return $(selector).html() || ''
                }
              }

              htmlContent = page.contentRendered || page.content || ''
              if (!htmlContent) return ''

              const $ = load(`<div id="rss-wrapper">${htmlContent}</div>`, { decodeEntities: false })
              $('.header-anchor').remove()
              $('h1').eq(0).remove()
              $('.sr-only').remove()
              $('a svg').remove()
              $('#rss-wrapper')
                .find('img')
                .each(function () {
                  const src = $(this).attr('src')
                  if (!/^(https?:)?\/\//.test(src)) {
                    $(this).attr('src', hostname + src)
                  }
                })
              return $('#rss-wrapper').html() || ''
            })()
          }
        }
      ]
    }))
    .forEach((page) => feed.item(page))

  return feed.xml({ indent: true })
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
) => {
  const options = { filter, hostname, count, selector, language, username };

  return {
    name: 'rss-feed',
    extendsBundlerOptions: (bundlerOptions, app) => {
      if (app.options.bundler.name === '@vuepress/bundler-vite') {
        bundlerOptions.viteOptions = bundlerOptions.viteOptions || {}
        bundlerOptions.viteOptions.plugins = bundlerOptions.viteOptions.plugins || []
        bundlerOptions.viteOptions.plugins.push({
          name: 'vite-plugin-rss-feed',
          configureServer(server) {
            server.middlewares.use((req, res, next) => {
              if (req.url === '/rss.xml') {
                res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
                res.end(generateRSS(app, options))
                return
              }
              next()
            })
          }
        })
      }
    },
    async onGenerated(app) {
      if (!app.env?.isBuild) {
        return
      }

      logger.info('Generate rss.xml...')
      const xml = generateRSS(app, options)
      const outDir = resolveOutDir(app)

      fs.writeFile(path.join(outDir, 'rss.xml'), xml, (error) => {
        if (error) {
          console.error(error)
        }
      })
    }
  }
}

export default rssFeedPlugin
