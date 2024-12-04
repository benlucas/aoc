export function part1(): number {
  const input = Deno.readTextFileSync("input/day3.txt");
  const regex = /mul\((\d*),(\d*)\)/g;
  return input
    .matchAll(regex)
    .reduce(
      (accumulator, currentMatch) => accumulator + (parseInt(currentMatch[1]) * parseInt(currentMatch[2])),
      0,
    );
}

export function part2(): number {
  const input = Deno.readTextFileSync("input/day3.txt");
  const regex = /(mul\((\d*),(\d*)\))|do\(\)|don't\(\)/g;

  let mutEnabled = true;
  let totalValue = 0;
  for (const match of input.matchAll(regex)) {
    if(match[0] === "do()") {
      mutEnabled = true;
      continue;
    }

    if(match[0] === "don't()") {
      mutEnabled = false;
      continue;
    }

    if(!mutEnabled) {
      continue;
    }

    totalValue += parseInt(match[2]) * parseInt(match[3])
  }

  return totalValue;
}
