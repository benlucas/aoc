import { readFileSync } from 'fs';

const values = readFileSync('src/day1/input.txt', 'utf-8')
    .split("\n")
    .map(strValue => Number(strValue));

function partOne() {
    const increases = values.filter((value, index, array) => value > array[index-1]).length;

    console.log(`Part 1: ${increases}`);
}

function partTwo() {
    let increases = 0;
    let previousWindowValue = Number.POSITIVE_INFINITY;

    for (let i = 2; i < values.length; i++) {
        const windowValue = values[i] + values[i - 1] + values[i - 2];
        if (windowValue > previousWindowValue) increases++;
        previousWindowValue = windowValue;
    }

    console.log(`Part 2: ${increases}`);
}

partOne();
partTwo();