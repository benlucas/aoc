import * as fs from "fs";
import * as os from "os";

const nums: {[key: string]: number} = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
}

function convertNumberString(num:string) {
    const regularNumber = Number(num)
    if (!isNaN(regularNumber)) return regularNumber;

    return nums[num];
}

const partOne = function() {
    const input = fs.readFileSync('src/day1/input.txt','utf8');

    const values = input.split(os.EOL).map(line => {
        const chars = [...line];
        const first = chars.find(char => Number(char));
        const last = chars.reverse().find(char => Number(char));
        return Number(`${first}${last}`)
    });

    const total = values.reduce(function (a, b) {return a + b;}, 0);

    console.log(`Part one: ${total}`);
}

const partTwo = function() {
    const input = fs.readFileSync('src/day1/input.txt','utf8');
    const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g

    const values = input.split(os.EOL).map(line => {
        let words = [...line.matchAll(regex)];

        const first = convertNumberString(words[0][1]);
        const last = convertNumberString(words[words.length - 1][1])

        return Number(`${first}${last}`)
    });

    const total = values.reduce(function (a, b) {return a + b;}, 0);

    console.log(`Part two: ${total}`);
}

partOne();
partTwo();
