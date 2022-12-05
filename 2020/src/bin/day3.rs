use std::{fs, io};

fn run_slope(input: &str, right: usize, down: usize)  -> io::Result<usize> {

    let lines = input.lines();
    let line_length = input.lines().last().unwrap().chars().count();
    let mut trees_hit = 0;
    for (i, line) in lines.enumerate() {

        if i == 0 || i % down > 0 {
            continue;
        }

        let index = if i == 1 {
            i * right
        } else {
            (i * right) / down % line_length
        };

        let tile = line.chars().nth(index).unwrap();

        if tile == '#' {
            trees_hit += 1;
        }
    }

    Ok(trees_hit)
}

fn solve1(input: &str) -> io::Result<usize> {
    run_slope(input, 3, 1)
}
fn solve2(input: &str) -> io::Result<usize> {
    Ok(
        run_slope(input, 1, 1)?
        * run_slope(input, 3, 1)?
        * run_slope(input, 5, 1)?
        * run_slope(input, 7, 1)?
        * run_slope(input, 1, 2)?
    )
}

fn main() -> io::Result<()> {
    let input = fs::read_to_string("input/day3_input.txt")?;

    println!("solution 1 = {:?}", solve1(&input)?);
    println!("solution 2 = {:?}", solve2(&input)?);
    Ok(())
}
