use std::{fs, io};

fn main() -> io::Result<()> {
    let input = fs::read_to_string("input/day1_input.txt")?
        .trim()
        .split('\n')
        .map(|x| x.parse().expect("not a number"))
        .collect::<Vec<isize>>();

    println!("solution 1 = {}", solve1(&input).unwrap());
    println!("solution 2 = {}", solve2(&input).unwrap());
    Ok(())
}

fn solve1(input: &Vec<isize>) -> Option<isize> {
    for a in input.iter() {
        for b in input.iter() {
            if a + b == 2020 {
                return Some(a * b);
            }
        }
    }
    None
}

fn solve2(input: &Vec<isize>) -> Option<isize> {
    for a in input.iter() {
        for b in input.iter() {
            for c in input.iter() {
                if a + b + c == 2020 {
                    return Some(a * b * c);
                }
            }
        }
    }
    None
}
