export function part1(): number {
  const input = Deno.readTextFileSync("input/day1.txt");
  const lines = input.split("\n");

  const list1 = lines.map(line => parseInt(line.split('   ')[0])).sort();
  const list2 = lines.map(line => parseInt(line.split('   ')[1])).sort();
  const diff = list1.map((value1, i) => list2[i] - value1)

  return diff.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);
}

export function part2(): number {
  const input = Deno.readTextFileSync("input/day1.txt");
  const lines = input.split("\n");

  const list1 = lines.map(line => parseInt(line.split('   ')[0])).sort();
  const list2 = lines.map(line => parseInt(line.split('   ')[1])).sort();
  const diff = list1.map(value1 => value1 * list2.filter(val => val === value1).length)

  return diff.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);
}
