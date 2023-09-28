class Node<T> {
    public next?: Node<T>;
    public value: T;
    constructor(value: T) {
        this.value = value;
    }
}
export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
    }

    push(item: T): void {
        const node = new Node(item);
        this.length++;

        if (!this.head) {
            this.head = node;
            return;
        }

        node.next = this.head;
        this.head = node;
        return;
    }

    pop(): T | undefined {
        if (!this.head) {
            return;
        }

        this.length--;
        let removedNode = this.head;
        this.head = removedNode.next;
        removedNode.next = undefined;
        return removedNode.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
