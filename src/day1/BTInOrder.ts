function search(node: BinaryNode<number> | null, arr: number[]) {
    if (!node) {
        return;
    }

    search(node.left, arr);
    arr.push(node.value);
    search(node.right, arr);
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    let arr: number[] = [];
    search(head, arr);
    return arr;
}
