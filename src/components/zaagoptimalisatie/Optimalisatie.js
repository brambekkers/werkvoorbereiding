export default class Optimalisatie {
    constructor(w, h, sawThickness) {
        this.sawThickness = sawThickness
        this.root = {
            x: sawThickness,
            y: sawThickness,
            w: Number(w),
            h: Number(h)
        };
    }

    fit(blocks) {
        let n, node, block;
        for (n = 0; n < blocks.length; n++) {
            block = blocks[n];
            if (node = this.findNode(this.root, block.w, block.h))
                block.fit = this.splitNode(node, block.w, block.h);
        }
    }

    findNode(root, w, h) {
        if (root.used)
            return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
        else if ((w <= root.w) && (h <= root.h))
            return root;
        return null;
    }

    splitNode(node, w, h) {
        node.used = true;
        node.down = {
            x: node.x,
            y: node.y + h + this.sawThickness,
            w: node.w,
            h: node.h - (h + this.sawThickness)
        };
        node.right = {
            x: node.x + w + this.sawThickness,
            y: node.y,
            w: node.w - (w + this.sawThickness),
            h: h
        };
        return node;
    }
}