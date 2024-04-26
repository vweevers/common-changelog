'use strict'

import { unified } from 'unified'
import markdown from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remark2rehype from 'remark-rehype'
import doc from 'rehype-document'
import format from 'rehype-format'
import stringify from 'rehype-stringify'
import raw from 'rehype-raw'
import slug from 'rehype-slug'
import link from 'rehype-autolink-headings'
import github from 'remark-github'
import urls from 'rehype-urls'
import shiki from 'rehype-shiki'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import { VFile } from 'vfile'
import { existsSync, copyFileSync, promises as fsp } from 'fs'
import path from 'path'

async function main () {
  await fsp.mkdir('dist', { recursive: true })
  await fsp.copyFile('badge.svg', 'dist/badge.svg')

  const themePath = './vendor/dracula-2.22.4/dracula-soft.json'
  const theme = JSON.parse(await fsp.readFile(themePath, 'utf8'))
  const readme = cleanReadme(await fsp.readFile('../README.md', 'utf8'))
  const processor = buildProcessor(theme)
  const file = await processor.process(new VFile({ value: readme }))

  await fsp.writeFile('dist/index.html', file.toString())
  await fsp.writeFile('dist/.nojekyll', '')
}

function buildProcessor (theme) {
  return unified()
    .use(markdown)
    .use(remarkGfm)
    .use(github, { repository: 'vweevers/common-changelog' })
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(raw)
    .use(doc, {
      title: 'Common Changelog',
      language: 'en',
      css: 'index.css',
      link: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: './favicon.svg'
      }
    })
    .use(slug)
    .use(link, {
      content: {
        type: 'element',
        tagName: 'img',
        properties: {
          src: './link.svg',
          className: ['icon', 'icon-link'],
          ariaHidden: true
        },
        children: []
      }
    })
    .use(urls, urlRewriter())
    .use(shiki, { theme })
    .use(rehypeAccessibleEmojis)
    .use(format)
    .use(stringify)
}

function cleanReadme (markdown) {
  // Uncollapse TOC
  markdown = markdown.replace('<details><summary>Click to expand</summary>', '')
  markdown = markdown.replace('</details>', '')

  // Add html to numbered headers
  markdown = markdown.replace(/^(#+) ([\d.]+) (.+)$/gm, (match, level, nr, text) => {
    // Workaround to skip one of the markdown examples (#15)
    if (match === '## 1.0.1 - 2019-08-24') return match

    const h = `h${level.length}`
    return `<${h}><span class="header-nr">${nr} </span>${text}</${h}>`
  })

  return markdown
}

function urlRewriter () {
  const visited = new Set()

  return function rewriteUrl (url) {
    if (!url.host) {
      const match = /^(?:\.\/)?([a-z0-9-_]+\.(svg|png|css))$/i.exec(url.path)

      if (match !== null) {
        const file = match[1]
        const src = existsSync(file) ? file : path.join('..', file)
        const dst = path.join('dist', file)

        if (!visited.has(dst)) {
          visited.add(dst)
          copyFileSync(src, dst)
          console.log(`Copied ${dst}`)
        }

        return './' + file
      } else if (/^[./]*LICENSE$/i.test(url.path)) {
        return 'https://github.com/vweevers/common-changelog/blob/main/LICENSE'
      }
    } else if (url.host === 'common-changelog.org') {
      return '.' + url.path
    }

    return url
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
