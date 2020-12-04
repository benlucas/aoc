use nom::bytes::complete::tag;
use nom::character::complete::alpha1;
use nom::character::complete::anychar;
use nom::character::complete::digit1;
use nom::character::complete::space1;
use nom::IResult;
use std::{fs, io};

fn parse_line(input: &str) -> IResult<&str, (usize, usize, char, String)> {
    let (input, min) = digit1(input)?;
    let (input, _) = tag("-")(input)?;
    let (input, max) = digit1(input)?;
    let (input, _) = space1(input)?;
    let (input, character) = anychar(input)?;
    let (input, _) = tag(": ")(input)?;
    let (input, password) = alpha1(input)?;
    Ok((input, (min.parse::<usize>().unwrap(), max.parse::<usize>().unwrap(), character, password.to_string())))
}

fn solve1(input: &str) -> io::Result<usize> {
    Ok(input
        .lines()
        .filter_map(|line| {
            let (_, (min, max, character, password)) = parse_line(&line).unwrap();
            let char_count = password
                .chars()
                .filter(|c| *c == character)
                .count();

            if char_count >= min && char_count <= max {
                Some(())
            } else {
                None
            }
        })
        .count()
    )
}

fn solve2(input: &str) -> io::Result<usize> {
    Ok(input
        .lines()
        .filter_map(|line| {
            let (_, (pos1, pos2, character, password)) = parse_line(&line).unwrap();

            if password.chars().nth(pos1 - 1)? == character && password.chars().nth(pos2 - 1)? != character {
                Some(())
            } else if password.chars().nth(pos1 - 1)? != character && password.chars().nth(pos2 - 1)? == character {
                Some(())
            } else {
                None
            }
        })
        .count()
    )
}

fn main() -> io::Result<()> {
    let input = fs::read_to_string("input/day2_input.txt")?;

    println!("solution 1 = {:?}", solve1(&input)?);
    println!("solution 2 = {:?}", solve2(&input)?);
    Ok(())
}
