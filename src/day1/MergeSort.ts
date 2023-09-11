function ms(arr: number[], lo: number, hi: number) {
    // Base case: down to 1 element
    if (lo >= hi) {
        return;
    }

    const mid = Math.floor((lo + hi) / 2);
    ms(arr, lo, mid);
    ms(arr, mid + 1, hi);
    merge(arr, lo, mid, hi);
}

function merge(arr: number[], lo: number, mid: number, hi: number) {
    const lengthLeft = mid - lo + 1;
    const lengthRight = hi - mid;

    const arrLeft = arr.slice(lo, mid + 1);
    const arrRight = arr.slice(mid + 1, hi + 1);

    let i;
    let j;
    i = j = 0;
    let k = lo;

    while (i < lengthLeft && j < lengthRight) {
        if (arrLeft[i] < arrRight[j]) {
            arr[k] = arrLeft[i];
            i++;
        } else {
            arr[k] = arrRight[j];
            j++;
        }

        k++;
    }

    // Add remaining values from non empty L or R arr to original Arr
    while (i < lengthLeft) {
        arr[k] = arrLeft[i];
        i++;
        k++;
    }

    while (j < lengthRight) {
        arr[k] = arrRight[j];
        j++;
        k++;
    }
}

export default function merge_sort(arr: number[]): void {
    ms(arr, 0, arr.length - 1);
}
