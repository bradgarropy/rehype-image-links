import {Element, isElement} from "hast-util-is-element"
import {CONTINUE, EXIT, Node, SKIP, visit} from "unist-util-visit"

type RehypeImageLinksOptions = {
    classes?: string[]
}

type RehypeImageLinks = (options?: RehypeImageLinksOptions) => void

const rehypeImageLinks: RehypeImageLinks = ({classes = []} = {}) => {
    const visitor = (node: Element) => {
        if (isElement(node, "img")) {
            if (!node.properties?.src) {
                console.error("The img does not contain a src attribute.")
                return EXIT
            }

            const linkNode: Element = {
                type: "element",
                tagName: "a",
                properties: {
                    href: node.properties?.src,
                },
                children: [{...node}],
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
