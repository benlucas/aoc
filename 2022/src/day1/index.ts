import * as fs from 'fs';
import * as os from 'os';

function getCalories() {
    const input = fs.readFileSync('src/day1/input.txt','utf8');
    let currentElfCalories = 0;
    let calories = new Array<number>();
    input.split(os.EOL).forEach(line => {
        if(line === '') {
            calories.push(currentElfCalories);
            currentElfCalories = 0;
            return; 
        }
        currentElfCalories += Number(line);
    });
    calories.sort((a,b) => { return b - a });
    return calories;
}

const partOne = function() {
    console.log(`Part one: ${getCalories()[0]}`);
}

const partTwo = function() {
    const calories = getCalories();
    console.log(`Part two: ${calories[0] + calories[1] + calories[2]}`);
}

partOne();
partTwo();
