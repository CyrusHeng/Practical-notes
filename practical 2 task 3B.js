//Practical 2 Task 3B
// Feel free to use these functions:
const get_x = (aar) => list_ref(aar, 0);
const get_y = (aar) => list_ref(aar, 1);
const get_width = (aar) => list_ref(aar, 2);
const get_height = (aar) => list_ref(aar, 3);


function optimized_smallest_bounding_AAR_area(rs) {
// longest long side
// shortest short side 
let count = 0;
let longest_short_side = 0;
let longest_long_side = 0;
for (let i = rs; count < length(i); count = count +1){
    let current = list_ref(i,count);
    let short_side = math_min(get_width(current),get_height(current));
                                        
    let long_side = math_max(get_width(current),get_height(current));
                                        
    if (count === 0){
        longest_short_side = short_side;
        longest_long_side = long_side;
        
    } else {
        longest_short_side = math_max(longest_short_side,short_side);
        longest_long_side = math_max(longest_long_side,long_side);
        }
    }
    return longest_long_side*longest_short_side;
}

const aar1 = list(2, 3, 10, 15);
const aar2 = list(1, 4, 20, 8 );
optimized_smallest_bounding_AAR_area( list(aar1, aar2));