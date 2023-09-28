class Node<T> {
    public value: T;
    public prev?: Node<T>;
    public next?: Node<T>;

    constructor(value: T) {
        this.value = value;
    }
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        const node = new Node(item);
        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        return;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("Invalid index");
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        if (idx === this.length) {
            this.append(item);
            return;
        }

        const node = new Node(item);
        this.length++;

        let curr = this.head;
        let count = 0;

        while (curr && count < idx) {
            curr = curr.next;
            count++;
        }

        node.prev = curr?.prev;
        node.next = curr;

        if (curr?.prev) {
            curr.prev.next = node;
            curr.prev = node;
        }

        return;
    }

    append(item: T): void {
        const node = new Node(item);
        this.length++;

        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
        return;
    }

    remove(item: T): T | undefined {
        let curr = this.head;

        while (curr && curr.value !== item) {
            curr = curr.next;
        }

        // Didn't find item
        if (!curr) {
            return;
        }

        this.length--;

        if (this.length === 0) {
            this.head = this.tail = undefined;
        } else if (curr === this.head) {
            this.head = this.head?.next;
        } else if (curr === this.tail) {
            this.tail = this.tail?.prev;
        }

        if (curr.prev) {
            curr.prev.next = curr.next;
        }

        if (curr.next) {
            curr.next.prev = curr.prev;
        }

        curr.prev = curr.next = undefined;
        return curr.value;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx > this.length - 1 || !this.head) {
            throw new Error("Invalid index");
        }

        let curr = this.head;
        let count = 0;

        while (curr.next && count < idx) {
            curr = curr.next;
            count++;
        }

        return curr.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx > this.length - 1) {
            throw new Error("Invalid index");
        }

        let curr = this.head;
        let count = 0;

        while (curr && count < idx) {
            curr = curr.next;
            count++;
        }

        if (!curr) {
            return;
        }

        this.length--;

        if (this.length === 0) {
            this.head = this.tail = undefined;
        } else if (idx === 0) {
            this.head = this.head?.next;
        } else if (idx === this.length) {
            this.tail = this.tail?.prev;
        }

        if (curr.prev) {
            curr.prev.next = curr.next;
        }

        if (curr.next) {
            curr.next.prev = curr.prev;
        }

        curr.next = curr.prev = undefined;
        return curr.value;
    }
}
