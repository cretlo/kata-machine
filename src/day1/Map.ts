function hash(value: string | number, tableLength: number) {
    let hash = 13;

    if (typeof value === "string") {
        for (let i = 0; i < value.length; ++i) {
            hash = hash * value.charCodeAt(i);
        }
    } else {
        hash = value;
    }

    return hash % tableLength;
}

export default class Map<T extends string | number, V> {
    private length: number;
    private arr: (V | undefined)[];

    constructor() {
        this.length = 0;
        this.arr = Array(50).fill(undefined);
    }

    get(key: T): V | undefined {
        const idx = hash(key, this.arr.length);
        return this.arr[idx];
    }

    set(key: T, value: V): void {
        const idx = hash(key, this.arr.length);
        this.length++;
        this.arr[idx] = value;
    }

    delete(key: T): V | undefined {
        const idx = hash(key, this.arr.length);
        const value = this.arr[idx];
        if (value) {
            this.length--;
            this.arr[idx] = undefined;
        }

        return value;
    }

    size(): number {
        return this.length;
    }
}
