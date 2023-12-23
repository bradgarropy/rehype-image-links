import rehypeParse from "rehype-parse"
import rehypeStringify from "rehype-stringify"
import {unified} from "unified"
import {expect, test} from "vitest"

import {rehypeImageLinks} from "../src"

test("adds image link", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeImageLinks)
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="https://example.com/photo.jpg" alt="alt text">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<a href="https://example.com/photo.jpg"><img src="https://example.com/photo.jpg" alt="alt text"></a>',
    )
})

test("adds image link with class", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeImageLinks, {classes: ["link", "fancy"]})
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="https://example.com/photo.jpg" alt="alt text">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<a href="https://example.com/photo.jpg" class="link fancy"><img src="https://example.com/photo.jpg" alt="alt text"></a>',
    )
})

test("adds image link without source", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeImageLinks)
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img alt="alt text">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<img alt="alt text">',
    )
})

test("skips other elements", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeImageLinks)
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        "<p>hello</p>",
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        "<p>hello</p>",
    )
})

test("transforms src attribute", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeImageLinks, {
            srcTransform: () => "test",
        })
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="https://example.com/photo.jpg" alt="alt text">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<a href="https://example.com/photo.jpg"><img src="test" alt="alt text"></a>',
    )
})

test("transforms href attribute", async () => {
    const processor = unified()
        .use(rehypeParse, {fragment: true})
        .use(rehypeImageLinks, {
            hrefTransform: () => "test",
        })
        .use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="https://example.com/photo.jpg" alt="alt text">',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<a href="test"><img src="https://example.com/photo.jpg" alt="alt text"></a>',
    )
})
