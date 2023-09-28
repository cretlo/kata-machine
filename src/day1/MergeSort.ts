function ms(arr: number[], lo: number, hi: number) {
    // Base case
    if (lo >= hi) {
        return;
    }

    const mid = Math.floor((lo + hi) / 2);

    ms(arr, lo, mid);
    ms(arr, mid + 1, hi);
    // Post recursion
    merge(arr, lo, mid, hi);
}

function merge(arr: number[], lo: number, mid: number, hi: number) {
    const lengthL = mid + 1 - lo;
    const lengthR = hi - mid;

    // Copies
    const arrL = arr.slice(lo, mid + 1);
    const arrR = arr.slice(mid + 1, hi + 1);

    let i, j;
    i = j = 0;
    let k = lo;

    while (i < lengthL && j < lengthR) {
        if (arrL[i] < arrR[j]) {
            arr[k] = arrL[i];
            i++;
        } else {
            arr[k] = arrR[j];
            j++;
        }

        k++;
    }

    while (i < lengthL) {
        arr[k] = arrL[i];
        i++;
        k++;
    }

    while (j < lengthR) {
        arr[k] = arrR[j];
        j++;
        k++;
    }
}

export default function merge_sort(arr: number[]): void {
    ms(arr, 0, arr.length - 1);
}
