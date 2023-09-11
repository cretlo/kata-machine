function search(
    arr: number[],
    lo: number,
    hi: number,
    needle: number,
): boolean {
    if (lo >= hi) {
        return false;
    }

    const mid = Math.floor((lo + hi) / 2);
    const value = arr[mid];

    if (value === needle) {
        return true;
    }

    if (value > needle) {
        return search(arr, lo, mid - 1, needle);
    } else {
        return search(arr, mid + 1, hi, needle);
    }
}
export default function bs_list(haystack: number[], needle: number): boolean {
    return search(haystack, 0, haystack.length, needle);
}
