import rehypeParse from "rehype-parse"
import rehypeStringify from "rehype-stringify"
import {unified} from "unified"

import {rehypeImageLinks} from "../dist/src/index.js"

const processor = unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypeImageLinks)
    .use(rehypeStringify)

const file = await processor.process(
    // eslint-disable-next-line quotes
    '<img src="https://example.com/photo.jpg" alt="alt text">',
)

const html = file.toString()
console.log(html)
