import * as fs from 'fs';
import * as os from 'os';

function getItemPriority(charcter: string) {
    const code = charcter.charCodeAt(0);
    return code < 97 ? code - 38 : code - 96;
}

function getMatchingItem(a: string, b: string) {
    for(let index in [ ...a ]) {
        if(b.includes(a[index])) return a[index]
    }
    throw new Error();
}

function getPrioritiesOfMatchingItems() {
    const input = fs.readFileSync('src/day3/input.txt','utf8');
    const priorities: Array<number> = [];

    input.split(os.EOL).forEach(line => {
        if (line.length === 0 ) return;
        const matchingCharacter = getMatchingItem(
            line.substring(0, line.length / 2),
            line.substring(line.length / 2)
        );
        priorities.push(getItemPriority(matchingCharacter));
    });
    return priorities;
}

const partOne = function() {
    console.log(`Part one: ${getPrioritiesOfMatchingItems().reduce((sum, a) => sum + a, 0 )}`);
}

partOne();
