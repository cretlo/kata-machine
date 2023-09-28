import Queue from "./Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q = new Queue<BinaryNode<number>>();
    q.enqueue(head);

    while (q.length) {
        const curr = q.deque() as BinaryNode<number>;

        if (needle === curr.value) {
            return true;
        }

        if (curr.left) {
            q.enqueue(curr.left);
        }

        if (curr.right) {
            q.enqueue(curr.right);
        }
    }

    return false;
}
