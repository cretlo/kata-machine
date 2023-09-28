class Node<T> {
    public value: T;
    public next?: Node<T>;

    constructor(value: T) {
        this.value = value;
    }
}
export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        const node = new Node(item);
        this.length++;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
        return;
    }

    deque(): T | undefined {
        if (!this.head) {
            return;
        }

        this.length--;
        const dequedNode = this.head;
        this.head = this.head.next;
        dequedNode.next = undefined;

        if (!this.head) {
            this.head = this.tail = undefined;
        }

        return dequedNode.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
