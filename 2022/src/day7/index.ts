import { readFileSync } from 'fs';
import { EOL } from 'os';

interface DirFile {
    name: string;
    size: number;
}

class Directory {
    public directories : Array<Directory> = [];
    public name: string = '';
    public parent: Directory | undefined;

    public files: Array<DirFile> = [];

    constructor(name: string, parent?: Directory) {
        this.parent = parent;
        this.name = name;
    }
}

class DirectoryWalker {
    currentDirectory: Directory | undefined = undefined;

    topLevel: Directory | undefined = undefined;

    public cd(name: string) {
      if(this.currentDirectory === undefined) {
          this.currentDirectory = new Directory(name);
          this.topLevel = this.currentDirectory;
      }
      else this.currentDirectory = this.currentDirectory.directories.find((dir) => name === dir.name);

    }

    public addDirectory(name: string) {
        this.currentDirectory?.directories.push(new Directory(name, this.currentDirectory));
    }

    public addFile(name: string, size: number) {
      this.currentDirectory?.files.push({ name, size })
    }

    public up() {
        this.currentDirectory = this.currentDirectory?.parent;
    }
}
function getDirectorySize(dir: Directory): number {
    const childSizes = dir.directories.reduce((previousValue, currentValue) => previousValue += getDirectorySize(currentValue), 0)
    return dir.files.reduce((previousValue, currentvalue) => previousValue += currentvalue.size, 0) + childSizes;
}

function getDirectories(dir: Directory, dirs: Directory[]) {
    dirs.push(dir);
    dir.directories.forEach(value => getDirectories(value, dirs));
    return dirs;
}

function process(): Directory {
    const walker = new DirectoryWalker();
    const input = readFileSync('src/day7/input.txt', "utf-8");
    input.split(EOL).forEach((line) => {
        if(line.startsWith('$ cd ..')) walker.up();
        else if(line.startsWith('$ cd ')) walker.cd(line.replace('$ cd ', ''));
        else if(line.startsWith('dir ')) walker.addDirectory(line.replace('dir ', ''));
        else if(line.startsWith('$ ls')) return;
        else {
          const matches = line.match(/(\d+) (.*)/);
          if(matches === null) return;
          walker.addFile(matches[2], Number(matches[1]))
        }

    });

  return walker.topLevel ? walker.topLevel : new Directory('');
}

function partOne() {
    const topLevel = process();
    let size = 0;

    getDirectories(topLevel, []).forEach(value => {
        const dirSize = getDirectorySize(value);
        if(dirSize < 100000) {
            size += dirSize;
        }
    });

    console.log(`7.1: ${size}`);
}

function partTwo() {
    const topLevel = process();
    let totalFree = 70000000 - getDirectorySize(topLevel);
    let requiredFolderSize = 30000000 - totalFree;
    let lowestSize = 70000000;

    getDirectories(topLevel, []).forEach(value => {
        const dirSize = getDirectorySize(value);
        if(dirSize > requiredFolderSize && dirSize < lowestSize) {
            lowestSize = dirSize;
        }
    });

    console.log(`7.2: ${lowestSize}`);
}

partOne();
partTwo();
