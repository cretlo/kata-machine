class Node<T> {
    value: T;
    next?: Node<T> | undefined;
    constructor(value: T) {
        this.value = value;
    }
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head: Node<T> | undefined;
    private tail: Node<T> | undefined;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node = new Node(item);
        this.length++;

        if (!this.head || this.length - 1 === 0) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head = node;
        return;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length - 1 || idx < 0) {
            throw new Error("Index out of range");
        }

        if (!this.head) {
            this.prepend(item);
            return;
        }

        let curr = this.head;
        let count = 0;

        while (curr.next && count < idx) {
            curr = curr.next;
        }

        const node = new Node(item);
        this.length++;

        node.next = curr.next;
        curr.next = node;
        return;
    }

    append(item: T): void {
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

    remove(item: T): T | undefined {
        if (!this.head) {
            return;
        }

        let curr = this.head;

        if (curr.value === item) {
            return this.removeAt(0);
        }

        while (curr.next && curr.next.value !== item) {
            curr = curr.next;
        }

        if (!curr.next) {
            return;
        }

        let removedNode = curr.next;
        curr.next = removedNode.next;
        removedNode.next = undefined;
        this.length--;
        return removedNode.value;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx > this.length) {
            throw new Error("Index out of range");
        }

        if (!this.head) {
            return;
        }

        let curr = this.head;
        let count = 0;

        while (curr.next && count !== idx) {
            curr = curr.next;
        }

        return curr.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx > this.length - 1) {
            throw new Error("Invalid index");
        }

        if (!this.head) {
            return;
        }

        if (idx === 0) {
            let removedNode = this.head;
            this.head = removedNode.next;
            removedNode.next = undefined;
            this.length--;
            return removedNode.value;
        }

        let curr = this.head;
        let count = 0;

        while (curr.next && count < idx - 1) {
            curr = curr.next;
        }

        if (!curr.next) {
            return;
        }

        let removedNode = curr.next;
        curr.next = removedNode.next;
        removedNode.next = undefined;
        this.length--;
        if (removedNode === this.tail) {
            this.tail = curr;
        }
        return removedNode.value;
    }
}
