function search(
    graph: WeightedAdjacencyList,
    node: number,
    needle: number,
    path: number[],
    seen: boolean[],
): number[] | null {
    if (graph[node].length === 0) {
        return null;
    }

    if (seen[node]) {
        return null;
    }

    seen[node] = true;

    path.push(node);
    if (node === needle) {
        return path;
    }

    const list = graph[node];
    for (let i = 0; i < list.length; ++i) {
        const edge = list[i];

        if (search(graph, edge.to, needle, path, seen)) {
            return path;
        }
    }

    path.pop();

    return null;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = Array(graph.length).fill(false);
    return search(graph, source, needle, [], seen);
}
