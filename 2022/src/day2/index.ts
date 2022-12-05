import * as fs from 'fs';
import * as os from 'os';

enum TheirHand {
    ROCK = 'A',
    PAPER = 'B',
    SCISSORS = 'C',
}

enum OurHand {
    ROCK = 'X',
    PAPER = 'Y',
    SCISSORS = 'Z',
}

enum StateScore {
    WIN = 6,
    DRAW = 3,
    LOSS = 0,
}

const handScore: Record<OurHand, number> = {
    [OurHand.ROCK] : 1,
    [OurHand.PAPER]: 2,
    [OurHand.SCISSORS]: 3,
}

const logicPartOne: Record<TheirHand, Record<OurHand, number>> = {
    [TheirHand.ROCK]: {
        [OurHand.ROCK]: handScore[OurHand.ROCK] + StateScore.DRAW,
        [OurHand.PAPER]: handScore[OurHand.PAPER] + StateScore.WIN,
        [OurHand.SCISSORS]: handScore[OurHand.SCISSORS] + StateScore.LOSS,
    },
    [TheirHand.PAPER]: {
        [OurHand.ROCK]: handScore[OurHand.ROCK] + StateScore.LOSS,
        [OurHand.PAPER]: handScore[OurHand.PAPER] + StateScore.DRAW,
        [OurHand.SCISSORS]: handScore[OurHand.SCISSORS] + StateScore.WIN,
    },
    [TheirHand.SCISSORS]: {
        [OurHand.ROCK]: handScore[OurHand.ROCK] + StateScore.WIN,
        [OurHand.PAPER]: handScore[OurHand.PAPER] + StateScore.LOSS,
        [OurHand.SCISSORS]: handScore[OurHand.SCISSORS] + StateScore.DRAW,
    }
}

const logicPartTwo: Record<TheirHand, Record<OurHand, number>> = {
    [TheirHand.ROCK]: {
        [OurHand.ROCK]: handScore[OurHand.SCISSORS] + StateScore.LOSS,
        [OurHand.PAPER]: handScore[OurHand.ROCK] + StateScore.DRAW,
        [OurHand.SCISSORS]: handScore[OurHand.PAPER] + StateScore.WIN,
    },
    [TheirHand.PAPER]: {
        [OurHand.ROCK]: handScore[OurHand.ROCK] + StateScore.LOSS,
        [OurHand.PAPER]: handScore[OurHand.PAPER] + StateScore.DRAW,
        [OurHand.SCISSORS]: handScore[OurHand.SCISSORS] + StateScore.WIN,
    },
    [TheirHand.SCISSORS]: {
        [OurHand.ROCK]: handScore[OurHand.PAPER] + StateScore.LOSS,
        [OurHand.PAPER]: handScore[OurHand.SCISSORS] + StateScore.DRAW,
        [OurHand.SCISSORS]: handScore[OurHand.ROCK] + StateScore.WIN,
    }
}

function getScore(logic: Record<TheirHand, Record<OurHand, number>>) {
    const input = fs.readFileSync('src/day2/input.txt','utf8');
    let score = 0;
    input.split(os.EOL).forEach(line => {
        if(line.length !== 3) {
            return;
        }
        const lineResult = logic[line[0] as TheirHand][line[2] as OurHand];
        score += lineResult;
    });
    return score;
}

const partOne = function() {
    console.log(`Part one: ${getScore(logicPartOne)}`);
}

const partTwo = function() {
    console.log(`Part two: ${getScore(logicPartTwo)}`);
}

partOne();
partTwo();
