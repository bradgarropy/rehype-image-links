# 🔗 rehype image links

[![version][version-badge]][npm]
[![downloads][downloads-badge]][npm]
[![size][size-badge]][bundlephobia]
[![github actions][github-actions-badge]][github-actions]
[![coverage][codecov-badge]][codecov]
[![typescript][typescript-badge]][typescript]
[![contributing][contributing-badge]][contributing]
[![contributors][contributors-badge]][contributors]
[![discord][discord-badge]][discord]

_[Rehype][rehype] plugin to wrap images in links._

## 📦 Installation

This package is hosted on [npm][npm].

```bash
npm install @bradgarropy/rehype-image-links
```

## 🥑 Usage

This is a [rehype][rehype] plugin for use in a [unified][unified] chain that modifies HTML syntax trees. It wraps all `img` tags in `a` tags with a link to their original source.

```typescript
import rehypeParse from "rehype-parse"
import rehypeStringify from "rehype-stringify"
import {unified} from "unified"

const processor = unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeImageLinks)
    .use(rehypeStringify)

const html = await processor.process(
    '<img src="https://example.com/photo.jpg" alt="alt text">',
)

console.log(file)

// output
// <a href="https://example.com/photo.jpg">
//     <img src="https://example.com/photo.jpg" alt="alt text" />
// </a>
```

## 📖 API Reference

### `use(rehypeImageLinks, options)`

The `options` object is optional. Here are all the available options.

| Name            | Required |        Default         |               Example                | Description                                                  |
| :-------------- | :------: | :--------------------: | :----------------------------------: | :----------------------------------------------------------- |
| `classes`       | `false`  |          `[]`          |         `["link", "fancy"]`          | List of classes to add to the `a` tag.                       |
| `srcTransform`  | `false`  | `(url: string) => url` | `(url: string) => url.toLowerCase()` | Function that modifies the `src` attribute on the `img` tag. |
| `hrefTransform` | `false`  | `(url: string) => url` | `(url: string) => url.toLowerCase()` | Function that modifies the `href` attribute on the `a` tag.  |

If you provide the `classes` option, those classes will be combined into a string and added to the `a` tag. For example, if you provided `{classes: ["link", "fancy"]}` for the options, the result will look like this.

```html
<!-- input -->
<img src="https://example.com/photo.jpg" alt="alt text" />

<!-- output -->
<a href="https://example.com/photo.jpg" class="link fancy">
    <img src="https://example.com/photo.jpg" alt="alt text" />
</a>
```

## ❔ Questions

🐛 report bugs by filing [issues][issues]  
📢 provide feedback with [issues][issues] or on [twitter][twitter]  
🙋🏼‍♂️ use my [ama][ama] or [twitter][twitter] to ask any other questions

## ✨ contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bradgarropy.com"><img src="https://avatars.githubusercontent.com/u/11336745?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brad Garropy</b></sub></a><br /><a href="https://github.com/bradgarropy/rehype-image-links/commits?author=bradgarropy" title="Code">💻</a> <a href="https://github.com/bradgarropy/rehype-image-links/commits?author=bradgarropy" title="Documentation">📖</a> <a href="https://github.com/bradgarropy/rehype-image-links/commits?author=bradgarropy" title="Tests">⚠️</a> <a href="#infra-bradgarropy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

[codecov]: https://app.codecov.io/gh/bradgarropy/rehype-image-links
[contributing]: https://github.com/bradgarropy/rehype-image-links/blob/master/contributing.md
[contributors]: #-contributors
[npm]: https://www.npmjs.com/package/@bradgarropy/rehype-image-links
[codecov-badge]: https://img.shields.io/codecov/c/github/bradgarropy/rehype-image-links?style=flat-square
[version-badge]: https://img.shields.io/npm/v/@bradgarropy/rehype-image-links.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dt/@bradgarropy/rehype-image-links?style=flat-square
[contributing-badge]: https://img.shields.io/badge/PRs-welcome-success?style=flat-square
[contributors-badge]: https://img.shields.io/github/all-contributors/bradgarropy/rehype-image-links?style=flat-square
[issues]: https://github.com/bradgarropy/rehype-image-links/issues
[twitter]: https://twitter.com/bradgarropy
[ama]: https://bradgarropy.com/ama
[bundlephobia]: https://bundlephobia.com/result?p=@bradgarropy/rehype-image-links
[size-badge]: https://img.shields.io/bundlephobia/minzip/@bradgarropy/rehype-image-links?style=flat-square
[github-actions]: https://github.com/bradgarropy/rehype-image-links/actions
[github-actions-badge]: https://img.shields.io/github/workflow/status/bradgarropy/rehype-image-links/%F0%9F%9A%80%20release?style=flat-square
[typescript]: https://www.typescriptlang.org/dt/search?search=%40bradgarropy%2Frehype-image-links
[typescript-badge]: https://img.shields.io/npm/types/@bradgarropy/rehype-image-links?style=flat-square
[discord]: https://bradgarropy.com/discord
[discord-badge]: https://img.shields.io/discord/748196643140010015?style=flat-square
[rehype]: https://github.com/rehypejs/rehype
[unified]: https://github.com/unifiedjs/unified
