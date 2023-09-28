function search(
    arr: number[],
    lo: number,
    hi: number,
    needle: number,
): boolean {
    if (lo > hi) {
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

function iterative_bs(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length - 1;
    let mid;

    do {
        mid = Math.floor((lo + hi) / 2);

        if (haystack[mid] === needle) {
            return true;
        }

        if (haystack[mid] > needle) {
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    } while (lo <= hi);

    return false;
}

export default function bs_list(haystack: number[], needle: number): boolean {
    // Iterative
    //return iterative_bs(haystack, needle);

    // Recursive
    return search(haystack, 0, haystack.length - 1, needle);
}
