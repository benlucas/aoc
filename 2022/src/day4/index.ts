import * as fs from 'fs';
import * as os from 'os';

function getOverlappingAssignments() {
  const input = fs.readFileSync('src/day4/input.txt','utf8');
  let completeOverlapCount = 0;
  let partialOverlapCount = 0;

  input.split(os.EOL).forEach(line => {
    if (line.length === 0 ) return;
    const [[assignment1Start, assignment1End], [assignment2Start, assignment2End]] = line.split(',').map(line => line.split(('-')).map(value => Number(value)));

    const assignment1Overlap = assignment1Start <= assignment2Start && assignment1End >= assignment2End;
    const assignment2Overlap = assignment2Start <= assignment1Start && assignment2End >= assignment1End;
    const assignment1EndIn2 = assignment1End >= assignment2Start && assignment2End >= assignment1End;
    const assignment2EndIn1 = assignment2End >= assignment1Start && assignment1End >= assignment2End;

    if(assignment1Overlap || assignment2Overlap)
      completeOverlapCount++

    if(assignment1Overlap || assignment2Overlap || assignment1EndIn2 || assignment2EndIn1)
      partialOverlapCount++
  });

  return [completeOverlapCount, partialOverlapCount];
}

const partOne = function() {
  console.log(`Part one: ${getOverlappingAssignments()[0]}`);
}

const partTwo = function() {
  console.log(`Part two: ${getOverlappingAssignments()[1]}`);
}

partOne();
partTwo();
