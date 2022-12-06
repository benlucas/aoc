import * as fs from 'fs';
import * as os from 'os';

class CrateStacks {
    public stacks: Array<Array<String>> = [];
    private readonly reverse: boolean = true;

    constructor(reverse: boolean) {
        this.reverse = reverse;
    }

    public readLine(line: string) {
        const characters = [ ...line ];
        for (let i = 1; i < characters.length; i+=4) {
            const crateValue = characters[i];
            const stackNumber = (i-1)/4;
            if(crateValue === ' ') continue;
            this.addToStart(crateValue, stackNumber)
        }
    }

    public addToStart(value: string, stack: number) {
      if(this.stacks[stack] === undefined) this.stacks[stack] = []
      this.stacks[stack].unshift(value);
    }

    public moveCrates(count: number, fromStackNumber: number, toStackNumber: number) {
        const fromStack = this.stacks[fromStackNumber];
        const toStack = this.stacks[toStackNumber];
        const temp = fromStack.splice(-count, count);
        toStack.splice(toStack.length, 0, ... this.reverse ? temp.reverse() : temp);
    }
}

function getTopCrates(reverse: boolean = true) {
    const input = fs.readFileSync('src/day5/input.txt','utf8');
    const crateStack = new CrateStacks(reverse);

    input.split(os.EOL).forEach((line) => {
      if(line === '' || line.startsWith(' 1 ')) return;
      if(!line.startsWith('move')) {
          crateStack.readLine(line);
      }
      const found = line.match(/\d+/g);
      if (found === null) return;
      crateStack.moveCrates(Number(found[0]), Number(found[1]) - 1, Number(found[2]) - 1)
    });

    return crateStack.stacks.reduce((result, a) => `${result}${a[a.length-1]}`, '' );
}

const partOne = function() {
    console.log(`Part one: ${getTopCrates()}`);
}
const partTwo = function() {
    console.log(`Part two: ${getTopCrates(false)}`);
}

partOne();
partTwo();
