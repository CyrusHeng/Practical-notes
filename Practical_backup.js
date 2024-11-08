// Practical 1
// Task 1A
function make_k_list(k, d) {
    // WRITE YOUR SOLUTION HERE
    if (d===0){
        return 0;
    }
    if (d>0){
        return build_list(x=>make_k_list(k,d-1),k); 
    }
}


// Task 1B
function sum_k_list(klist) {
    // WRITE YOUR SOLUTION HERE.
    function accumulate_tree(f,op,initial,tree){
        return accumulate((x,ys)=> is_list(x)
                                ? op(accumulate_tree(f,op,initial,x),ys)
                                : op(f(x),ys),initial,tree);
    }
    return !is_list(klist)
    ? klist
    : accumulate_tree(x=>x, (x,y)=> x+y,0,klist);
}


// Task 1C
function map_k_list(f, klist) {
    // WRITE YOUR SOLUTION HERE.
    function map_tree(f,tree){
        return map((x)=> is_list(x)? (map_tree(f,x)): f(x),tree);
    }
    if (!is_list(klist)){
        return f(klist);
    } else {
    return map_tree(f,klist);
    }
}

// Task 2A
function route_distance(mat, route) {
    // WRITE YOUR SOLUTION HERE.
    return is_null(route) || is_null(tail(route))
    ? 0
    : mat[head(route)][head(tail(route))] + 
            route_distance(mat,tail(route));
}

// Task 2B
function shortest_paper_route(n, mat, start) {
    // You can keep, modify or remove the permutations function.
    function permutations(ys) {
        return is_null(ys)
            ? list(null)
            : accumulate(append, null,
                map(x => map(p => pair(x, p),
                             permutations(remove(x, ys))),
                    ys));
    }
    // WRITE YOUR SOLUTION HERE.
    // enum_list(0,n)
    // remove start from list
    // permutate remaining list
    // put start at beggining and end of list
    // apply route_distance on the final list
    const full_list = enum_list(0,n-1);
    const no_start = filter(x=> x !== start,full_list);
    const possible_routes = permutations(no_start);
    
    const start_in_front = map(x=> append(list(start),x),possible_routes);
    let start_at_end = map(x=> append(x,list(start)),start_in_front);
    let end = length(start_at_end);
    let smaller_route = head(start_at_end);
    let smaller = route_distance(mat, head(start_at_end));
    for(let count= 0 ; count< (end -1) ; count = count +1){
        if (smaller > route_distance(mat, head(tail(start_at_end)))){
            smaller = route_distance(mat, head(tail(start_at_end)));
            smaller_route = head(tail(start_at_end));
        } 
        start_at_end = tail(start_at_end);
    }
    return pair(smaller_route,smaller);
}

// Task 3A
function make_postfix_exp(bae) {
    // WRITE YOUR SOLUTION HERE.
    function swap(A, i, j) {
        const temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }
    function append_array(A, v) {
    A[array_length(A)] = v;
}
    function flatten_array(array){
    
    function helper(array, result){
        const len = array_length(array);
        
        for(let i = 0; i< len; i=i+1){
            if(is_array(array[i])){
                helper(array[i], result);
            }
            else{
                append_array(result,array[i]);
            }
        }
        return result;
    }
    return helper(array, []);
}
     if (is_array(bae)){
         swap(bae,1,2);
            let m = array_length(bae);
                for (let n=0; n<m; n = n+1){
                        is_array(bae[n])
                        ? make_postfix_exp(bae[n])
                        : bae[n];
                        
                }
            
        } else {
            bae = [bae];
        }
    return flatten_array(bae);
}

//Task 3B
function eval_postfix_exp(pfe) {
    function filter_array(pred, A) {
    let k = 0;
    let new_k = 0;
    let new_array = [];
    let len = array_length(A);
    
    while (k< len){
        if (pred(A[k])){
            new_array[new_k] = A[k];
            new_k = new_k+1;
        }
        k = k+1;
    }
    return new_array;
}
    // WRITE YOUR SOLUTION HERE.
    let control = pfe;
    let stash = [];
    
    for (let i=0; i<array_length(control); i = i +1){
        stash[array_length(stash)] = control[i];
        if (stash[array_length(stash)-1] === "+"){
            stash[array_length(stash)-3] = stash[array_length(stash)-3] 
                                                + stash[array_length(stash)-2];
          
            stash = filter_array(x=> x!== stash[array_length(stash)-2],stash);
            stash = filter_array(x=> x!== "+",stash);
            
            }
        if (stash[array_length(stash)-1] === "-"){
            stash[array_length(stash)-3] = stash[array_length(stash)-3] 
                                                - stash[array_length(stash)-2];
            stash = filter_array(x=> x!== stash[array_length(stash)-2],stash);
            stash = filter_array(x=> x!== "-",stash);
            }
        if (stash[array_length(stash)-1] === "/"){
            stash[array_length(stash)-3] = stash[array_length(stash)-3] 
                                                / stash[array_length(stash)-2];
            stash = filter_array(x=> x!== stash[array_length(stash)-2],stash);
            stash = filter_array(x=> x!== "/",stash);
            }
        if (stash[array_length(stash)-1] === "*"){
            stash[array_length(stash)-3] = stash[array_length(stash)-3] 
                                                * stash[array_length(stash)-2];
            stash = filter_array(x=> x!== stash[array_length(stash)-2],stash);
            stash = filter_array(x=> x!== "*",stash);
            }
        }
        return stash[0];
    }
    
// Practical 2
// Task 1A
function delta_encode(L){
    let minus = 0;
    let ans = null;
    for (let i = L; !is_null(i); i = tail(i)){
        let digit = head(i) - minus;
        ans = append(ans, list(digit));
        minus = head(i);
    }
    return ans;
}

// function delta_encode(L) {
//     // WRITE YOUR SOLUTION HERE.
//     function helper(xs,prev){
//         return is_null(xs)
//             ? null
//             : pair(head(xs)-prev,helper(tail(xs),head(xs)));
//     }
//     return helper(L,0);
        
// }

// Task 1B
function delta_decode(D) {
    function helper(xs,prev){
        return is_null(xs)
        ? null
        : pair(head(xs)+prev,helper(tail(xs),head(xs)+prev));
    }
    // WRITE YOUR SOLUTION HERE.
    return helper(D,0);
}

delta_decode(list(3,1,2,-8,0));


// Task 2A
function runlength_encode(L){
    if(is_null(L)){
        return null;
    }
    let final = null;
    let current = head(L);
    let count = 1;
    for (let i=tail(L); !is_null((i));i=tail(i)){
        let next = head(i);
        if (current === next){
            count = count + 1;
        } else {
            if (count === 1){
                final = append(final,list(current));
                current = next;
            } else {
                final = append(final, list([current,count]));
                current = next;
                count = 1;
            }
        }
    }
    return count === 1
        ? append(final, list(current))
        : append(final, list([current,count]));
}
display_list(runlength_encode(list(9)));

// Task 2B
function runlength_decode(R) {
    // WRITE YOUR SOLUTION HERE.
    return is_null(R)
    ? null
    : is_number(head(R))
    ? pair(head(R),runlength_decode(tail(R)))
    : append(build_list(x=>head(head(R)),tail(head(R))),runlength_decode(tail(R)));
}


// Task 3A
const get_x = (aar) => list_ref(aar, 0);
const get_y = (aar) => list_ref(aar, 1);
const get_width = (aar) => list_ref(aar, 2);
const get_height = (aar) => list_ref(aar, 3);
function smallest_bounding_AAR_area(rs) {
let min_x = Infinity;
let min_y = Infinity;
let max_x = -Infinity;
let max_y = -Infinity;
for (let p = rs; !is_null(p); p = tail(p)) {
const aar = head(p);
const x1 = get_x(aar);
const x2 = x1 + get_width(aar);
const y1 = get_y(aar);
const y2 = y1 + get_height(aar);
if (x1 < min_x) { min_x = x1; } else { }
if (x2 > max_x) { max_x = x2; } else { }
if (y1 < min_y) { min_y = y1; } else { }
if (y2 > max_y) { max_y = y2; } else { }
}
return (max_x - min_x) * (max_y - min_y);
}

// Task 3B
const get_x = (aar) => list_ref(aar, 0);
const get_y = (aar) => list_ref(aar, 1);
const get_width = (aar) => list_ref(aar, 2);
const get_height = (aar) => list_ref(aar, 3);
function optimized_smallest_bounding_AAR_area(rs) {
let max_longer = 0;
let max_shorter = 0;
for (let p = rs; !is_null(p); p = tail(p)) {
const aar = head(p);
const width = get_width(aar);
const height = get_height(aar);
const longer = math_max(width, height);
const shorter = math_min(width, height);
if (longer > max_longer) { max_longer = longer; } else { }
if (shorter > max_shorter) { max_shorter = shorter; } else { }
}
return max_longer * max_shorter;
}

// Task 3C
function overlap_area(aar1,aar2){
    const first_x = get_x(aar1);
    const second_x = get_x(aar2);
    let first_y = get_y(aar1);
    let second_y = get_y(aar2);
    let first_h = get_height(aar1);
    let second_h = get_height(aar2);
    let first_w = get_width(aar1);
    let second_w = get_width(aar2);
    
    let leftmost_L = math_min(first_x,second_x);
    let rightmost_L = math_max(first_x,second_x);
    
    let leftmost_R = math_min(first_x+first_w,second_x+second_w);
    let rightmost_R = math_max(first_x+first_w,second_x+second_w);
    
    let lowest_B = math_min(first_y,second_y);
    let highest_B = math_max(first_y,second_y);
    
    let lowest_T = math_min(first_y+first_h,second_y+second_h);
    let highest_T = math_max(first_y+first_h,second_y+second_h);
    
    if ((leftmost_R - rightmost_L<=0)|| (lowest_T -lowest_B<=0)){
        return 0;
    } else {
    return (leftmost_R - rightmost_L) * (lowest_T -highest_B);
    }
}


// Practical 3
//Task 1A
function is_pa_word(s) {
    // your solution goes here
    return !is_null(member(s,pa_words));
}


// Task 1B
function count_matches(char, pos) {
    // your solution goes here
    let matches = 0;
    function helper(xs,char,pos){
        if (is_null(tail(xs))){
            return matches;
        }
        if (char===char_at(list_ref(xs,1),pos)){
            matches = matches +1;
            filter(x=>x!== list_ref(xs,1), xs);
            helper(tail(xs),char,pos);
        } else {
            helper(tail(xs),char,pos); 
        }
        return matches;
    }
    return helper(pa_words,char,pos);
}

// Task 1C
function string_length(str) {
    let len = 0;

    while (char_at(str, len) !== undefined) {
        len = len + 1;
    }

    return len;
}

function string_to_list(str) {
    return map((x) => char_at(str, x), enum_list(0, string_length(str) - 1));
}

function char_stream(s) {
    // your solution goes here
    let characters = string_to_list(s);
    let count = 0;
    let stream = 0;
    function helper(list) {
        if (is_null(list)){
            return null;
        } else {
            stream = pair((head(list)),()=>helper(tail(list)));
        }
        return stream;
    }
    return helper(string_to_list(s));
    
}

// Task 1D
function solve(n, constraints) {
    // your solution goes here
    let count = 0;
    // filter the list to contain words with length n
    let list = filter(x=> string_length(x) === n , pa_words);
    for (let i=constraints;count<length(constraints); count = count+1){
        let current = list_ref(constraints,count);
        let pos = head(current);
        let letter = tail(current);
        list = filter(x=> letter=== char_at(x,pos),list);
    }
    return list;
}


// Task 2A
function eval_poly(poly){
    function p(x){
        return accumulate((curr,next)=> head(curr)*math_pow(x,tail(curr))+ next ,0,poly);
    }
    return p;
}

// Task 2B
function add_poly(poly1, poly2) {
    if (is_null(poly1)) {
        return poly2;
        
        // WRITE YOUR SOLUTION HERE.

    } else if (is_null(poly2)) {
        return poly1;

        // WRITE YOUR SOLUTION HERE.

    } else {
        const coeff1 = head(head(poly1));
        const coeff2 = head(head(poly2));
        const exp1 = tail(head(poly1));
        const exp2 = tail(head(poly2));

        if (exp1 === exp2) {
           return (coeff1+coeff2===0)
            ? add_poly(tail(poly1),tail(poly2))
            : pair(pair(coeff1+coeff2,exp1),add_poly(tail(poly1),tail(poly2)));
            // WRITE YOUR SOLUTION HERE.

        } else if (exp1 < exp2) {
            return pair(head(poly1),add_poly(tail(poly1),poly2));

            // WRITE YOUR SOLUTION HERE.

        } else {
            return pair(head(poly2),add_poly(poly1,tail(poly2)));
            // WRITE YOUR SOLUTION HERE.
        }
    }
}


// Task 2C
function multiply_poly(poly1, poly2) {
    return accumulate((p, q) => add_poly(p, q),
                        null,
                            map(t1 => map(t2 => pair(head(t1) * head(t2),
                                    tail(t1) + tail(t2)),
                                                        poly2),
                                                                poly1));
}


// Task 3
function alt_column_matrix(R, C) {
    const M = [];
    //create the total number of arrays first
        for (let r = 0; r < R; r = r + 1) {
                M[r] = [];
            }
    
    let count = 1;
    for (let c = 0; c < C; c = c + 1) {
        //for odd columns
        if (c % 2 === 0) {
            for (let r = 0; r < R; r = r + 1) {
                M[r][c] = count;
                count = count + 1;
            }
        } else {
            //for even columns
            for (let r = R - 1; r >= 0; r = r - 1) {
                M[r][c] = count;
                count = count + 1;
                }
            }
        }
    return M;
}






