/* -------------------------------------------------------------------------- */
/*                             ARRAY MANIPULATION                             */
/* -------------------------------------------------------------------------- */

function append_array(A, v) {
    A[array_length(A)] = v;
}

function append_array_copy(A, B) {
    A = copy_array(A);
    for (let i = 0; i < array_length(B); i = i + 1) {
        append(A, B[i]);
    }
    return A;
}

function combine_array(A,B){
    let lenA = array_length(A);
    let lenB = array_length(B);
    
    for(let i = lenA; i<lenA+lenB; i=i+1){
        A[i] = B[i-lenA];
    }
    return A;
}

function in_array(array,element){
    let true_or_false = false;
    const len = array_length(array);
    for(let i = 0; i<len; i=i+1){
        if(array[i] === element ){
            true_or_false = true;
        }
    }
    return true_or_false;
}


function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
    return A;
}

function slice_array(A, i, j) {
    const new_A = [];

    for (let x = i; x <= j; x = x + 1) {
        new_A[x - i] = A[x];
    }

    return new_A;
}

function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}

function linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i < len && A[i] !== v) {
        i = i + 1;
    }
    return i < len;
}

function binary_search(A, v) {
    let low = 0;
    let high = array_length(A) - 1;

    while (low <= high) {
        const mid = math_floor((low + high) / 2);
        if (v === A[mid]) {
            break;
        } else if (v < A[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return low <= high;
}

function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}

function accumulate_array(op, init, A) {
    let k = 0;
    let result = op(init, A[k]);
    let len = array_length(A);
    while (k< len-1){
        result = op(result, A[k+1]);
        k = k+1;
    }
    return result;
}

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

function transpose(M) {
    const trans_rows = array_length(M[0]);
    const trans_col = array_length(M);
    let new_M = [];
    
    for(let r = 0; r< trans_rows; r=r +1){
        new_M[r] = [];
        for(let c = 0; c< trans_col; c= c+1){
            new_M[r][c] = M[c][r];
        }
    }
    return new_M;
}

// Converts recursively for every nested arrays
function array_to_list_recursive(A) {
    if (!is_array(A)) {
        return A;
    } else {
        const len = array_length(A);
        let L = null;
        for (let i = len - 1; i >= 0; i = i - 1) {
            L = pair(array_to_list_recursive(A[i]), L);
        }
        return L;
    }
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

function get_index(A,element){
    function helper(A, element, counter){
        if(A[counter] === element){
            return counter;
        }
        else{
            return helper(A, element, counter+1);
        }
    }
    return helper(A,element,0);
}

//needs get index
function pop(A, element){
    const index = get_index(A, element);
    let result = [];
    for(let i = 0; i< index; i=i+1){
        result[i] = A[i];
    }
    for (let j= index; j< array_length(A)-1; j=j+1){
        result[j] = A[j+1];
    }
    return result;
}

function pop_index(A, index){
    let result = [];
    for(let i = 0; i< index; i=i+1){
        result[i] = A[i];
    }
    for (let j= index; j< array_length(A)-1; j=j+1){
        result[j] = A[j+1];
    }
    return result;
}


// Sorts the array of numbers in ascending order.
function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
    return A;
}

function sort_array_with_f(A, f) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && f(A[j], x)) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
}

function digits_to_string(digits) {
    const len = array_length(digits);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(digits[i]);
    }
    return str;
}
// const D = [8, 3, 9, 2, 8, 1];
// digits_to_string(D);  // returns "839281"

/* -------------------------------------------------------------------------- */
/*                                ARRAY SORTING                               */
/* -------------------------------------------------------------------------- */

// ----
// Selection Sort
function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; j = j + 1) {
        if (A[j] < A[min_pos]) {
            min_pos = j;
        }
    }
    return min_pos;
}

function selection_sort(A) {
    const len = array_length(A);

    for (let i = 0; i < len - 1; i = i + 1) {
        let min_pos = find_min_pos(A, i, len - 1);
        swap(A, i, min_pos);
    }
}
// ----

// ----
// Insertion Sort
function insertion_sort(A) {
    const len = array_length(A);

    for (let i = 1; i < len; i = i + 1) {
        let j = i - 1;
        while (j >= 0 && A[j] > A[j + 1]) {
            swap(A, j, j + 1);
            j = j - 1;
        }
    }
}
// ----

// ----
// This alternative method replaces
// the swaps by shifting elements right.
function insertion_sort2(A) {
    const len = array_length(A);

    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j]; // shift right
            j = j - 1;
        }
        A[j + 1] = x;
    }
}
// ----

// ----
// Merge Sort
function merge(A, low, mid, high) {
    const B = [];
    let left = low;
    let right = mid + 1;
    let Bidx = 0;

    while (left <= mid && right <= high) {
        if (A[left] <= A[right]) {
            B[Bidx] = A[left];
            left = left + 1;
        } else {
            B[Bidx] = A[right];
            right = right + 1;
        }
        Bidx = Bidx + 1;
    }

    while (left <= mid) {
        B[Bidx] = A[left];
        Bidx = Bidx + 1;
        left = left + 1;
    }
    while (right <= high) {
        B[Bidx] = A[right];
        Bidx = Bidx + 1;
        right = right + 1;
    }

    for (let k = 0; k < high - low + 1; k = k + 1) {
        A[low + k] = B[k];
    }
}

function merge_sort_helper(A, low, high) {
    if (low < high) {
        const mid = math_floor((low + high) / 2);
        merge_sort_helper(A, low, mid);
        merge_sort_helper(A, mid + 1, high);
        merge(A, low, mid, high);
    }
}

function merge_sort(A) {
    merge_sort_helper(A, 0, array_length(A) - 1);
}
// ----

// ----
// Quick Sort
function partition(A, p) {
    const a = [];
    const b = [];

    for (let i = 0; i < array_length(A); i = i + 1) {
        const x = A[i];

        if (x < p) {
            append(a, x);
        } else {
            append(b, x);
        }
    }

    return pair(a, b);
}

function quick_sort_helper(A) {
    const len = array_length(A);
    if (len < 2) {
        return A;
    } else {
        const p = A[0];
        const rest = slice_array(A, 1, len - 1);

        const partitions = partition(rest, p);
        const small_part = head(partitions);
        const big_part = tail(partitions);

        const sorted_big_part = quick_sort_helper(big_part);
        append(sorted_big_part, p);

        return append_array_copy(
            quick_sort_helper(small_part),
            sorted_big_part
        );
    }
}

function quick_sort(A) {
    const res = quick_sort_helper(A);

    for (let i = 0; i < array_length(A); i = i + 1) {
        A[i] = res[i];
    }
}
// ----



// Requires: 1) array_to_list_recursive 
//           2) list_to_array_recursive 
//           3) flatten_list_once
// Flattens for just the first depth of elements
function flatten_array_once(A) {
    const A_xs = array_to_list_recursive(A);
    const A_xs_flattened = flatten_list_once(A_xs);
    return list_to_array_recursive(A_xs_flattened);
}

// Requires: 1) array_to_list_recursive 
//           2) list_to_array_recursive 
//           3) flatten_list_recursive
// Flattens recursively for every nested arrays
function flatten_array_recursive(A) {
    const A_xs = array_to_list_recursive(A);
    const A_xs_flattened = flatten_list_recursive(A_xs);
    return list_to_array_recursive(A_xs_flattened);
    
    
/* -------------------------------------------------------------------------- */
/*                              LIST MANIPULATION                             */
/* -------------------------------------------------------------------------- */

function take(xs, n) {
    return n === 0 ? null : pair(head(xs), take(tail(xs), n - 1));
}

function drop(xs, n) {
    return n === 0 ? xs : drop(tail(xs), n - 1);
}

function permutations(xs) {
    if (is_null(xs)) {
        return list(null);
    } else {
        return accumulate(
            append,
            null,
            map((x) => {
                const perm_without_x = permutations(remove(x, xs));
                return map((p) => pair(x, p), perm_without_x);
            }, xs)
        );
    }
}

function combinations(xs, r) {
    if ((r !== 0 && is_null(xs)) || r < 0) {
        return null;
    } else if (r === 0) {
        return list(null);
    } else {
        const no_choose = combinations(tail(xs), r);
        const yes_choose = combinations(tail(xs), r - 1);
        const yes_item = map((x) => pair(head(xs), x), yes_choose);
        return append(no_choose, yes_item);
    }
}

function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}

function list_to_array_recursive(L) {
    if (!is_list(L)) {
        return L;
    } else {
        const A = [];
        let i = 0;
        for (let p = L; !is_null(p); p = tail(p)) {
            A[i] = list_to_array_recursive(head(p));
            i = i + 1;
        }
        return A;
    }
}

function flatten_list(lst){
    return accumulate((x,y)=>append(x,y),null,lst);
}

function remove_duplicates(lst) {
    return is_null(lst)
    ? null
    : pair(head(lst),
    remove_duplicates(
    filter(x => !equal(x, head(lst)), tail(lst))));
}

/* -------------------------------------------------------------------------- */
/*                                LIST SORTING                                */
/* -------------------------------------------------------------------------- */

// ----
// Selection Sort
function smallest(xs) {
    return accumulate((x, y) => (x < y ? x : y), head(xs), tail(xs));
}

function selection_sort(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
    }
}
// ----

// ----
// Insertion Sort
function insert(x, xs) {
    return is_null(xs)
        ? list(x)
        : x <= head(xs)
        ? pair(x, xs)
        : pair(head(xs), insert(x, tail(xs)));
}

function insertion_sort(xs) {
    return is_null(xs) ? xs : insert(head(xs), insertion_sort(tail(xs)));
}
// ----

// ----
// Merge Sort
function middle(n) {
    return math_floor(n / 2);
}

function merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        return x < y
            ? pair(x, merge(tail(xs), ys))
            : pair(y, merge(xs, tail(ys)));
    }
}

function merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const mid = middle(length(xs));
        return merge(merge_sort(take(xs, mid)), merge_sort(drop(xs, mid)));
    }
}
// ----

// ----
// Quick Sort
function partition(xs, p) {
    return pair(
        filter((x) => x <= p, xs),
        filter((x) => x > p, xs)
    );
}

function quick_sort(xs) {
    if (is_null(xs)) {
        return list();
    } else if (is_null(tail(xs))) {
        return xs;
    } else {
        const p = head(xs);

        const partitions = partition(tail(xs), p);
        const small_part = head(partitions);
        const big_part = tail(partitions);

        return append(quicksort(small_part), pair(p, quicksort(big_part)));
    }
}

//----
//Bubblesort
function bubblesort_array(A) {
    const len = array_length(A);
    for (let i = len - 1; i >= 1; i = i - 1) {
    for (let j = 0; j < i; j = j + 1) {
    if (A[j] > A[j + 1]) {
    const temp = A[j];
    A[j] = A[j + 1];
    A[j + 1] = temp;
    }
    }
    }
    }


//----


/* -------------------------------------------------------------------------- */
/*                                    TREES                                   */
/* -------------------------------------------------------------------------- */
function accumulate_tree(f,op,initial, tree){
    return accumulate((x,ys)=> is_list(x)
                        ? op(accumulate_tree(f,op,initial,x),ys): op(f(x),ys),initial, tree);
}

function map_tree(f,tree){
    return map((x)=> is_list(x)? (map_tree(f,x)): f(x),tree);
}

function tree_sum(tree) {
    return accumulate_tree(x => x, (x, y) => x + y, 0 , tree);
}

function count_data_items(tree) {
    return accumulate_tree(x => 1, (x, y) => x + y, 0 , tree);
}

function flatten(tree) {
    return accumulate_tree(x => list(x), append, null , tree);
}

/* -------------------------------------------------------------------------- */
/*                        DESTRUCTIVE LIST MANIPULATION                       */
/* -------------------------------------------------------------------------- */

function d_append(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else {
        set_tail(xs, d_append(tail(xs), ys));
        return xs;
    }
}

function d_filter(pred, xs) {
    if (is_null(xs)) {
        return null;
    } else {
        if (pred(head(xs))) {
            set_tail(xs, d_filter(pred, tail(xs)));
            return xs;
        } else {
            return d_filter(pred, tail(xs));
        }
    }
}

function d_map(fun, xs) {
    if (!is_null(xs)) {
        set_head(xs, fun(head(xs)));
        d_map(fun, tail(xs));
    }
}

/* -------------------------------------------------------------------------- */
/*                          LIST DESTRUCTIVE SORTING                          */
/* -------------------------------------------------------------------------- */

// Merge Sort
function d_split_list(xs) {
    const len = length(xs);
    const mid_point = len % 2 === 0 ? len / 2 - 1 : math_floor(len / 2);

    let mid_pair = xs;
    for (let i = 0; i < mid_point; i = i + 1) {
        mid_pair = tail(mid_pair);
    }

    const rest_of_xs = tail(mid_pair);
    set_tail(mid_pair, null);
    return pair(xs, rest_of_xs);
}

function d_merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);

        if (x < y) {
            set_tail(xs, d_merge(tail(xs), ys));
            return xs;
        } else {
            set_tail(ys, d_merge(xs, tail(ys)));
            return ys;
        }
    }
}

function d_merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const xs_split = d_split_list(xs);
        const part_a = head(xs_split);
        const part_b = tail(xs_split);

        return d_merge(d_merge_sort(part_a), d_merge_sort(part_b));
    }
}
// ----

/* -------------------------------------------------------------------------- */
/*                             STRING MANIPULATION                            */
/* -------------------------------------------------------------------------- */

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


function list_to_string(xs) {
	function helper(xs, result) {
		return is_null(xs)
			? result
			: helper(tail(xs), result + head(xs));
	}
	return helper(xs, "");
}


function string_length(s) {
	function helper(pos) {
		return char_at(s, pos) === undefined
			? pos
			: helper(pos + 1);
	}
	return helper(0);
}

/* -------------------------------------------------------------------------- */
/*                                    MISC                                    */
/* -------------------------------------------------------------------------- */

function return_helper(returns, f, base) {
    const filtered_returns = filter(f, returns);
    return is_null(filtered_returns) ? base : head(filtered_returns);
}

function match_op(op) {
    return op === "+"
        ? (x, y) => x + y
        : op === "-"
        ? (x, y) => x - y
        : op === "*"
        ? (x, y) => x * y
        : (x, y) => x / y;
}

/* -------------------------------------------------------------------------- */
/*                                 MEMOIZATION                                */
/* -------------------------------------------------------------------------- */

const mem = [];

function read(n, k) {
    return mem[n] === undefined ? undefined : mem[n][k];
}
function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

/* -------------------------------------------------------------------------- */
/*                             NUMBER MANIPULATION                            */
/* -------------------------------------------------------------------------- */

function digits_length(num) {
    return math_floor(math_log10(num)) + 1;
}

function digit_at(num, n) {
    const str_n = stringify(num);
    return parse_int(char_at(str_n, n), 10);
}

function num_to_digits_list(num) {
    const len = digits_length(num);
    return map((i) => digit_at(num, i), enum_list(0, len - 1));
}
    
    