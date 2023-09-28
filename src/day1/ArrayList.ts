export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private arr: Array<T>;

    constructor(amount: number) {
        this.capacity = amount;
        this.length = 0;
        this.arr = Array<T>(amount);
    }

    prepend(item: T): void {
        if (this.length === 0) {
            this.arr[0] = item;
        }

        if (this.length >= this.capacity) {
            this.doubleCapacity();
        }

        this.unshift(item);
        return;
    }

    insertAt(item: T, idx: number): void {
        if (this.length >= this.capacity) {
            this.doubleCapacity();
        }

        for (let i = this.length; i > idx; --i) {
            this.arr[i] = this.arr[i - 1];
        }

        this.arr[idx] = item;
        this.length++;
    }

    append(item: T): void {
        if (this.length >= this.capacity) {
            this.doubleCapacity();
        }

        this.arr[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        let idx = undefined;
        for (let i = 0; i < this.length; ++i) {
            if (this.arr[i] === item) {
                idx = i;
                break;
            }
        }

        if (idx === undefined) {
            return undefined;
        }

        for (let i = idx; i < this.length; ++i) {
            this.arr[i] = this.arr[i + 1];
        }
        this.length--;

        return item;
    }

    get(idx: number): T | undefined {
        if (idx > this.length - 1) {
            return undefined;
        }

        return this.arr[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx > this.length - 1) {
            return undefined;
        }

        const value = this.arr[idx];

        this.shiftFromIdx(idx);

        return value;
    }

    private doubleCapacity(): void {
        const doubledCapacity = this.capacity * 2;
        const newArr = Array<T>(doubledCapacity);

        for (let i = 0; i < this.length; ++i) {
            newArr[i] = this.arr[i];
        }

        this.arr = newArr;
    }

    private shiftFromIdx(idx: number): void {
        for (let i = idx; i < this.length; ++i) {
            this.arr[i] = this.arr[i + 1];
        }

        this.length--;
    }

    private unshift(item: T) {
        for (let i = this.length - 1; i >= 0; --i) {
            this.arr[i + 1] = this.arr[i];
        }

        this.arr[0] = item;
        this.length++;
    }
}
