fn main() {
    use std::time::Instant;
    let now = Instant::now();
    // let total = split_stones(Vec::from([125, 17]), 25).len();
    // let total = split_stones(Vec::from([2, 72, 8949, 0, 981038, 86311, 246, 7636740]), 50).len();
    let mut total = 0;
    // for num in [2, 72, 8949, 0, 981038, 86311, 246, 7636740] {
    for num in [125, 17] {
        total += recursive_split_stones(num, 30);
    }
    println!("total: {}", total);

    let elapsed = now.elapsed();
    println!("Elapsed: {:.2?}", elapsed);
}

fn get_len(num: u32) -> u32 {
    if num < 10 {
        1
    } else if num < 100 {
        2
    } else if num < 1000 {
        3
    } else if num < 10000 {
        4
    } else if num < 100000 {
        5
    } else if num < 1000000 {
        6
    } else if num < 10000000 {
        7
    } else if num < 100000000 {
        8
    } else if num < 1000000000 {
        9
    // } else if num < 10000000000 {
    //     10
    // } else if num < 100000000000 {
    //     11
    // } else if num < 1000000000000 {
    //     12
    // } else if num < 10000000000000 {
    //     13
    // } else if num < 100000000000000 {
    //     14
    // } else if num < 1000000000000000 {
    //     15
    // } else if num < 10000000000000000 {
    //     16
    } else {
        // panic!("{}", num)
        10
    }
}

fn split_stone(num: u32) -> Vec<u32> {
    if num == 0 {
        return Vec::from([1]);
    }

    let len = get_len(num);
    if len % 2 == 0 {
        let pow = 10_u32.pow(len / 2);
        let left = num / pow;
        let right = num - left * pow;
        return Vec::from([left, right]);
    }

    return Vec::from([num * 2024]);
}

fn split_stones(nums: Vec<u32>, depth: i32) -> Vec<u32> {
    let mut nums = nums;
    for _ in 0..depth {
        let mut new_nums = Vec::new();
        for num in nums {
            new_nums.extend(split_stone(num));
        }
        nums = new_nums;
        // println!("{:?}", nums);
    }
    return nums;
}

const DEPTH: i32 = 14;
fn recursive_split_stones(num: u32, depth: i32) -> usize {
    let nums = split_stones(Vec::from([num]), DEPTH.min(depth));
    if depth <= DEPTH {
        return nums.len();
    }

    let mut total = 0;
    for n in nums {
        total += recursive_split_stones(n, depth - DEPTH);
    }
    return total;
}
