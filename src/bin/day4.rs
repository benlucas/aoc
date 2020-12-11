use std::{fs, io};
use std::io::Lines;
const VALID_PASSPORT_FIELDS: &[&str] = &["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

fn solve1(input: &str) -> io::Result<usize> {

    //
    // let thing = input.lines()
    //     .map(|line| line.split(" ").map(String::from).collect::<Vec<_>>())
    //     .flatten()
    //     .collect::<Vec<String>>();


    let passports = input.split("\n\n").map(String::from) // Split each passport
        .map(|passport_string|passport_string.replace("\n", " ")) // Remove any newlines between passport properties
        .map(|passport_string|passport_string.split_whitespace().map(String::from).collect::<Vec<String>>()) // Split each passport property into a new vec
        .map(|passport| passport.iter().map(|property| property.split(":").map(String::from).collect::<Vec<String>>()).collect::<Vec<Vec<String>>>())
        // .collect::<Vec<Vec<Vec<String>>>>();
        .filter(|passport| {
            // for property in passport {
            //     let field = property.get(0)?;
            //     let value = property.get(1)?;
            // }
            let property_fields = passport.iter().map(|property| property.get(0).unwrap() ).map(String::from).collect::<Vec<String>>();

            VALID_PASSPORT_FIELDS.iter().all(|item| property_fields.contains(&item.to_string()))
            // println!("solution 1 = {:?}", property_fields);
            // println!("solution 1 = {:?}", valid);

        })
        .count();

    // let whatsit = thing.last();
    // .map(|line| line.split(" ").map(String::from).collect::<Vec<_>>())
    // .flatten()
    // .collect::<Vec<String>>();

    // println!("solution 1 = {:?}", input);
    // println!("solution 1 = {:?}", passports);
    // println!("solution 1 = {:?}", whatsit.unwrap().replace("\n", "").split_whitespace().map(String::from).collect::<Vec<String>>().last().unwrap().split(":").map(String::from).collect::<Vec<String>>());


    Ok(passports)
}

fn main() -> io::Result<()> {
    let input = fs::read_to_string("input/day4_input.txt")?;

    println!("solution 1 = {:?}", solve1(&input)?);
    // println!("solution 2 = {:?}", solve2(&input)?);
    Ok(())
}
