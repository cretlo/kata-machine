class Node<T> {
    char: T | undefined;
    isWord: boolean;
    nexts: (Node<T> | null)[];

    constructor(char?: T) {
        this.isWord = false;
        this.char = char;
        this.nexts = Array(26).fill(null);
    }
}

export default class Trie {
    data: Node<string>;

    constructor() {
        this.data = new Node<string>();
    }

    insert(item: string): void {
        this.insertRecurse(item, 0, this.data);
    }

    delete(item: string): void {
        this.deleteRecurse(item, this.data, 0);
    }

    find(partial: string): string[] {
        if (partial.length === 0) {
            return [];
        }

        return this.findRecurse(partial, 0, this.data, "", []);
    }

    private deleteRecurse(
        word: string,
        curr: Node<string>,
        strIdx: number,
    ): boolean {
        // Traverse down
        // root: 'f', 1: 'o', 2: 'o', 3: 'l'
        const char = word.charAt(strIdx);
        const charIdx = this.getIdx(char);

        // Reached end of word. Word not in trie
        if (strIdx === word.length - 1 && !curr.nexts[charIdx]?.isWord) {
            console.log(`Word ${word} doesn't exists`);
            return false;
        }

        // Reached end of word. Word is in trie
        if (strIdx === word.length - 1 && curr.nexts[charIdx]?.isWord) {
            // Check if anything is below it
            for (let i = 0; i < curr.nexts.length; ++i) {
                // If there is then mark as "not a word" and don't delete
                if (curr.nexts[charIdx]?.nexts[i]) {
                    curr.nexts[charIdx]!.isWord = false;
                    return false;
                }
            }

            // Nothing after so delete
            curr.nexts[charIdx] = null;
            return true;
        }

        // Word isn't in trie
        if (!curr.nexts[charIdx]) {
            // Word doesns't exists in trie
            return false;
        }

        const wordExistsRemoveChar = this.deleteRecurse(
            word,
            curr.nexts[charIdx] as Node<string>,
            strIdx + 1,
        );

        if (wordExistsRemoveChar) {
            // Remove as we come up in post
            curr.nexts[charIdx] = null;
            return true;
        }

        return false;
    }

    private findRecurse(
        partialStr: string,
        strIdx: number,
        curr: Node<string>,
        word: string,
        words: string[],
    ): string[] {
        // Get to end of partial str
        if (strIdx < partialStr.length) {
            const char = partialStr.charAt(strIdx);
            const charIdx = this.getIdx(char);

            // Root char wont get added
            const builtWord = word.concat(curr.char ? curr.char : "");

            return this.findRecurse(
                partialStr,
                strIdx + 1,
                curr.nexts[charIdx] as Node<string>,
                builtWord,
                words,
            );
        }

        if (!curr.char) {
            // Needed to make Typescript happy
            throw Error("Char does not exist in Node");
        }

        let builtWord = word.concat(curr.char);

        // Find each complete word from partial
        if (curr.isWord) {
            words.push(builtWord);
        }

        for (let i = 0; i < curr.nexts.length; ++i) {
            if (curr.nexts[i]) {
                this.findRecurse(
                    partialStr,
                    strIdx + 1,
                    curr.nexts[i] as Node<string>,
                    builtWord,
                    words,
                );
            }
        }

        return words;
    }

    private insertRecurse(
        str: string,
        strIdx: number,
        curr: Node<string>,
    ): void {
        if (str.length === strIdx) {
            return;
        }

        const char = str.charAt(strIdx);
        const charIdx = this.getIdx(char);

        if (curr.nexts[charIdx]) {
            const nextNode = curr.nexts[charIdx] as Node<string>;
            this.insertRecurse(str, strIdx + 1, nextNode);
            return;
        }

        const newNode = new Node(char);
        curr.nexts[charIdx] = newNode;

        if (str.length - 1 === strIdx) {
            newNode.isWord = true;
        }

        this.insertRecurse(
            str,
            strIdx + 1,
            curr.nexts[charIdx] as Node<string>,
        );
        return;
    }

    private debugInsertion(curr: Node<string>, nodeIdx: number) {
        for (let i = 0; i < curr.nexts.length; ++i) {
            if (curr.nexts[i]) {
                console.log(curr.nexts[i]);
                this.debugInsertion(curr.nexts[i] as Node<string>, nodeIdx + 1);
            }
        }
    }

    private getIdx(char: string): number {
        const zero = "a".charCodeAt(0);

        return char.charCodeAt(0) - zero;
    }
}
