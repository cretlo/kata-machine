function qs(arr: number[], lo: number, hi: number): void {
    // Base case
    if (lo >= hi) {
        return;
    }

    const pivotIdx = partition(arr, lo, hi);
    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
    let pivot = arr[hi];

    let idx = lo - 1;

    for (let j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            idx++;
            const tmp = arr[j];
            arr[j] = arr[idx];
            arr[idx] = tmp;
        }
    }

    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;
    return idx;
}

export default function quick_sort(arr: number[]): void {
    return qs(arr, 0, arr.length - 1);
}
