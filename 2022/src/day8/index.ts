import { readFileSync } from 'fs';
import { EOL } from 'os';

class TreeManager {
    public trees: string[] = [];
    max = {X:0, Y:0}

    constructor(trees: string[]) {
        this.trees = trees;
        this.max.X = trees[0].length;
        this.max.Y = trees.length - 1;
    }

    process() {
        let visibleTrees = 0;
        let highestScore = 0;
        for(let x = 1; x < this.max.X - 1; x++) {
            for(let y = 1; y < this.max.Y; y++) {
                if(this.isTreeVisible(x, y)) {
                    visibleTrees++
                }
                if(this.treeScenicScore(x, y) > highestScore) highestScore = this.treeScenicScore(x, y);

            }
        }

        return {
            visibleTrees: visibleTrees + this.max.X * 2 + this.max.Y * 2 -2,
            highestScore,
      };
    }

    isTreeVisible(x: number, y: number): boolean {
        const tree = Number(this.trees[x][y]);
        let top = true, bottom = true, left = true, right = true;
        for (let tempX = 0; tempX < this.max.X; tempX++) {
            const isBlocked = tree <= Number(this.trees[tempX][y]);
            if (!isBlocked || x == tempX) continue;
            if (tempX < x) top = false;
            if (tempX > x) bottom = false;
        }
        for (let tempY = 0; tempY <= this.max.Y; tempY++) {
            const isBlocked = tree <= Number(this.trees[x][tempY]);
            if (!isBlocked || y == tempY) continue;
            if (tempY < y) left = false;
            if (tempY > y) right = false;
        }
        return left || right || top || bottom;
    }

  public treeScenicScore(x: number, y:number): number {
        const tree = Number(this.trees[x][y]);

        let up = 0, down = 0, left = 0, right = 0;
        for(let tempX = x-1; tempX >= 0; tempX--) {
          if(this.trees[tempX][y] == undefined) break;
          const otherTree = Number(this.trees[tempX][y]);
          up++;
          if(otherTree >= tree) break;
        }

        for(let tempX = x+1; tempX < this.max.X; tempX++) {
            if(this.trees[tempX][y] == undefined) break;
            const otherTree = Number(this.trees[tempX][y]);
            down++;
            if(otherTree >= tree) break;
        }

        for(let tempY = y-1; tempY >= 0; tempY--) {
            if(this.trees[x][tempY] == undefined) break;
            const otherTree = Number(this.trees[x][tempY]);
            left++;
            if(otherTree >= tree) break;
        }

        for(let tempY = y+1; tempY <= this.max.Y; tempY++) {
            if(this.trees[x][tempY] == undefined) break;
            const otherTree = Number(this.trees[x][tempY]);
            right++;
            if(otherTree >= tree) break;
        }
        return up * down *  left * right;
    }
}

function process() {
    const input = readFileSync('src/day8/input.txt', "utf-8");
    const manager = new TreeManager(input.split(EOL));

    console.log(`8.1: ${manager.process().visibleTrees}`);
    console.log(`8.2: ${manager.process().highestScore}`);
}

process();