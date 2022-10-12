import {Element, isElement} from "hast-util-is-element"
import {CONTINUE, Node, SKIP, visit} from "unist-util-visit"

type RehypeImageLinksOptions = {
    classes?: string[]
}

type RehypeImageLinks = (options?: RehypeImageLinksOptions) => void

const rehypeImageLinks: RehypeImageLinks = ({classes = []} = {}) => {
    const visitor = (node: Element) => {
        if (isElement(node, "img")) {
            const linkNode: Element = {
                type: "element",
                tagName: "a",
                properties: {
                    class: classes.join(" "),
                    href: node.properties?.src ?? "",
                },
                children: [{...node}],
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
