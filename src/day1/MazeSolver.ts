const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

dir.forEach((point) => console.log(point));
let recursiveCallMade = 0;

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    recursiveCallMade++;
    // Is it off the maze
    if (curr.y < 0 || curr.y >= maze.length) {
        return false;
    }

    if (curr.x < 0 || curr.x >= maze[0].length) {
        return false;
    }

    // Is it a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // Is it the end
    if (curr.x === end.x && curr.y === end.y) {
        path.push(end);
        return true;
    }

    // Have we seen it {
    if (seen[curr.y][curr.x]) {
        return false;
    }

    seen[curr.y][curr.x] = true;
    path.push(curr);

    for (let i = 0; i < dir.length; ++i) {
        const [x, y] = dir[i];

        if (
            walk(
                maze,
                wall,
                {
                    x: curr.x + x,
                    y: curr.y + y,
                },
                end,
                seen,
                path,
            )
        ) {
            return true;
        }
    }

    path.pop();
    return false;
}
export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [];
    const seen2 = new Array(maze.length).fill(
        new Array(maze[0].length).fill(false),
    );

    for (let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    console.log("Seen: ", seen);
    console.log("Seen2: ", seen);

    walk(maze, wall, start, end, seen2, path);

    return path;
}
