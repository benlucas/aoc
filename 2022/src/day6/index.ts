import * as fs from 'fs';

function uniqueMarker(length: number) {
  const input = fs.readFileSync('src/day6/input.txt', "utf-8");
  for(let i = 0; i < input.length; i++) {
      const uniques = new Set(input.slice(i, i+length));
      if (uniques.size === length) return i + length;
  }

  return -1;
}

function partOne() {
  console.log(`6.1: ${uniqueMarker(4)}`);
}

function partTwo() {
  console.log(`6.2: ${uniqueMarker(14)}`);
}

partOne();
partTwo();