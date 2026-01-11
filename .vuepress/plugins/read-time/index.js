import path from 'path'
import spawn from 'cross-spawn'
import moment from 'moment'

const globalWords = {}

const stripHtml = (value = '') => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

const countWords = (value = '') => {
  let length = 0
  try {
    let working = value.replace(/(\r\n+|\s+|　+)/g, '龘')
    working = working.replace(/[\x00-\xff]/g, 'm')
    working = working.replace(/m+/g, '*')
    working = working.replace(/龘+/g, '')
    length = working.length
  } catch (error) {
    console.error(error)
  }
  return length
}

const getGitLastUpdatedTimeStamp = (filePath) => {
  if (!filePath) return undefined
  try {
    const output = spawn
      .sync('git', ['log', '-1', '--format=%at', path.basename(filePath)], {
        cwd: path.dirname(filePath)
      })
      .stdout.toString('utf-8')
    return parseInt(output, 10) * 1000
  } catch (error) {
    console.error(error)
    return undefined
  }
}

const readTimePlugin = (options = {}) => ({
  name: 'read-time',
  extendsPage: (page) => {
    const { path: pagePath, frontmatter, contentRendered, content, filePath } = page

    const rawContent = contentRendered || content
    if (!rawContent) {
      return
    }

    if (frontmatter && frontmatter.readingTime) {
      page.data.readingTime = frontmatter.readingTime
      return
    }

    const excludePage = options.excludes && options.excludes.some((pattern) => {
      const testRegex = new RegExp(pattern)
      return testRegex.test(pagePath)
    })

    if (excludePage) {
      return
    }

    const strippedContent = stripHtml(rawContent)
    const words = countWords(strippedContent)
    globalWords[pagePath] = words

    page.data.readingTime = {
      words,
      minutes: words / 500,
      globalWords
    }

    if (pagePath === '/') {
      const timestamp = getGitLastUpdatedTimeStamp(filePath || '.')
      if (timestamp) {
        page.data.siteLastUpdated = moment(new Date(timestamp)).format('YYYY-MM-DD')
      } else {
        page.data.siteLastUpdated = moment().format('YYYY-MM-DD')
      }

      frontmatter.title = 'lcomplete 的技术分享'
      frontmatter.comment = false
      frontmatter.pageClass = 'index-page-class'
    }
  }
})

export default readTimePlugin
