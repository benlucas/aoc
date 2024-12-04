
enum REPORT_STATUS {
  INCREASING = "INCREASING",
  DECREASING = "DECREASING",
  INVALID = "INVALID",
}

function getLevelStatus(previous: string, current: string) {
  if (parseInt(previous) < parseInt(current)) return REPORT_STATUS.INCREASING;
  if (parseInt(previous) > parseInt(current)) return REPORT_STATUS.DECREASING;
  return REPORT_STATUS.INVALID;
}

function isReportSafe(levels: string[]): boolean {
  const differences: number[] = []

  for (let i = 1; i < levels.length; i++) {
    differences.push(parseInt(levels[i]) - parseInt(levels[i - 1]));
  }
	const increasing = differences.every((d) => d >= 1 && d <= 3);
	const decreasing = differences.every((d) => d <= -1 && d >= -3);

	return increasing || decreasing;
}

export function part1(): number {
  const lines = Deno.readTextFileSync("input/day2.txt").split("\n");

  const result = lines.filter((report) => {
    const levels = report.split(" ");
    const reportStatus = getLevelStatus(levels[0], levels[1]);

    for (let i = 1; i < levels.length; i++) {
      const currentLevel = parseInt(levels[i]);
      const previous = parseInt(levels[i-1]);

      if(reportStatus == REPORT_STATUS.INCREASING && currentLevel > previous && (currentLevel - previous) <= 3) {
          continue;
      }

      if(reportStatus == REPORT_STATUS.DECREASING && currentLevel < previous && (previous - currentLevel) <= 3) {
          continue;
      }

      return false
    }

    return true;
  });

  return result.length;
}

export function part2(): number {
  const lines = Deno.readTextFileSync("input/day2.txt").split("\n");
  let safeReports = 0;

  for (const report of lines) {
    const levels = report.split(" ")

    if(isReportSafe(levels)) {
      safeReports++;
      continue;
    }

    for (let i = 0; i < levels.length; i++) {
      const removed = levels.filter((_, ii) => ii !== i);
      if (isReportSafe(removed)) {
        safeReports++;
        break;
      }
    }
  }

  return safeReports;
}