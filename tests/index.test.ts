import rehypeStringify from "rehype-stringify"
import {unified} from "unified"

import {rehypeImageLinks} from "../src"

test("works", async () => {
    const processor = unified().use(rehypeImageLinks).use(rehypeStringify)

    const file = await processor.process(
        // eslint-disable-next-line quotes
        '<img src="https://example.com/photo.jpg"/>',
    )

    const html = file.toString()

    expect(html).toEqual(
        // eslint-disable-next-line quotes
        '<a href="https://example.com/photo.jpg"><img src="https://example.com/photo.jpg"/></a>',
    )
})
