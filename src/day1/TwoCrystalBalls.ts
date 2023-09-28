export default function two_crystal_balls(breaks: boolean[]): number {
    // [f, f, f, t, t, t]

    // Find first break with sqrt search

    const sqrt = Math.floor(Math.sqrt(breaks.length));

    let i = 0;
    while (i < breaks.length) {
        if (breaks[i]) {
            break;
        }

        i += sqrt;
    }

    if (i >= breaks.length) {
        return -1;
    }

    let j = i - sqrt;
    while (!breaks[j] && j < breaks.length) {
        j++;
    }

    if (j >= breaks.length) {
        return -1;
    }

    return j;
}
