import * as fs from 'fs';
import * as os from 'os';

function getItemPriority(charcter: string) {
  const code = charcter.charCodeAt(0);
  return code < 97 ? code - 38 : code - 96;
}

function getMatchingItems(a: string, b: string) {
  const matchingItems: string[] = [];
  for(let index in [ ...a ]) {
      if(b.includes(a[index]) && !matchingItems.includes(a[index])) matchingItems.push(a[index]);
  }
  return matchingItems;
}

function getPrioritiesOfMatchingItems() {
  const input = fs.readFileSync('src/day3/input.txt','utf8');
  const priorities: Array<number> = [];

  input.split(os.EOL).forEach(line => {
    if (line.length === 0 ) return;
    const matchingItems = getMatchingItems(
      line.substring(0, line.length / 2),
      line.substring(line.length / 2)
    );
    priorities.push(getItemPriority(matchingItems[0]));
  });
  return priorities;
}

function getPrioritiesOfMatchingItemsGroups() {
  const input = fs.readFileSync('src/day3/input.txt','utf8');
  const priorities: Array<number> = [];
  const lines = input.split(os.EOL);

  for (let i = 0; i < lines.length - 1; i += 3){
    const items1 = lines[i], items2 = lines[i+1], items3 = lines[i+2];
    const matchingItems12 = getMatchingItems(items1, items2);
    const matchingItems23 = getMatchingItems(matchingItems12.join(''), items3);
    priorities.push(getItemPriority(matchingItems23[0]));
  }

  return priorities;
}

const partOne = function() {
  console.log(`Part one: ${getPrioritiesOfMatchingItems().reduce((sum, a) => sum + a, 0 )}`);
}

const partTwo = function() {
    console.log(`Part two: ${getPrioritiesOfMatchingItemsGroups().reduce((sum, a) => sum + a, 0 )}`);
}

partOne();
partTwo();
