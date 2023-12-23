import type {Element} from "hast"
import {isElement} from "hast-util-is-element"
import type {Node} from "unist"
import {CONTINUE, EXIT, SKIP, visit} from "unist-util-visit"

type RehypeImageLinksOptions = {
    classes?: string[]
    srcTransform?: (url: string) => string
    hrefTransform?: (url: string) => string
}

type RehypeImageLinks = (options?: RehypeImageLinksOptions) => void

const rehypeImageLinks: RehypeImageLinks = ({
    classes = [],
    srcTransform = (url: string) => url,
    hrefTransform = (url: string) => url,
} = {}) => {
    const visitor = (node: Element) => {
        if (isElement(node, "img")) {
            if (!node.properties?.src) {
                console.error("The img does not contain a src attribute.")
                return EXIT
            }

            const imgNode = structuredClone(node)
            imgNode.properties.src = srcTransform(String(node.properties?.src))

            const linkNode: Element = {
                type: "element",
                tagName: "a",
                properties: {
                    href: hrefTransform(String(node.properties?.src)),
                },
                children: [imgNode],
            }

            if (classes.length > 0 && linkNode.properties) {
                linkNode.properties.class = classes.join(" ")
            }

            Object.assign(node, linkNode)
            return SKIP
        }

        return CONTINUE
    }

    const transformer = (tree: Node) => {
        visit(tree, "element", visitor)
    }

    return transformer
}

export {rehypeImageLinks}
export type {RehypeImageLinks, RehypeImageLinksOptions}
