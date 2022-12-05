import { readFileSync } from 'fs';

const values = readFileSync('src/day2/input.txt', 'utf-8')
    .split("\n")
    .map((s) => {
        const [direction, distance] = s.split(' ')
        return [direction, Number(distance)] as [string, number];
    });

function partOne() {
    let depth = 0;
    let horizontal = 0;
    values.forEach(([direction, distance]) => {
        switch(direction) {
            case 'up':
                depth -= distance;
                break;
            case 'down':
                depth += distance;
                break;
            case 'forward':
                horizontal += distance;
                break;
        }
    });
    console.log(`Part 1: ${depth * horizontal}`);
}

function partTwo() {
    let aim = 0;
    let depth = 0;
    let horizontal = 0;
    values.forEach(([direction, distance]) => {
        switch(direction) {
            case 'up':
                aim -= distance;
                break;
            case 'down':
                aim += distance;
                break;
            case 'forward':
                horizontal += distance;
                depth += aim * distance;
                break;
        }
    });
    console.log(`Part 2: ${depth * horizontal}`);
}

partOne();
partTwo();
