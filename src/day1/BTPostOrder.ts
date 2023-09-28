function search(node: BinaryNode<number> | null, arr: number[]) {
    if (!node) {
        return;
    }

    search(node.left, arr);
    search(node.right, arr);
    arr.push(node.value);
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    const arr: number[] = [];
    search(head, arr);

    return arr;
}
