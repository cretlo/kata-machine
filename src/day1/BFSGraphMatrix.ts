import Queue from "./Queue";

export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const q = new Queue<number>();
    const prev: number[] = Array(graph.length).fill(-1);
    const seen: boolean[] = Array(graph.length).fill(false);

    q.enqueue(source);
    seen[source] = true;

    do {
        const curr = q.deque() as number;

        if (curr === needle) {
            break;
        }

        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; ++i) {
            if (seen[i]) {
                continue;
            }

            if (adjs[i] === 0) {
                continue;
            }

            prev[i] = curr;
            seen[i] = true;
            q.enqueue(i);
        }
    } while (q.length);

    let curr = needle;

    if (prev[curr] === -1) {
        return null;
    }

    const outPath: number[] = [];

    while (prev[curr] !== -1) {
        outPath.push(curr);
        curr = prev[curr];
    }

    return [source].concat(outPath.reverse());
}
