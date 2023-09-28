function search(node: BinaryNode<number> | null, arr: number[]) {
    if (!node) {
        return;
    }

    arr.push(node.value);
    search(node.left, arr);
    search(node.right, arr);
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    const arr: number[] = [];
    search(head, arr);

    return arr;
}
