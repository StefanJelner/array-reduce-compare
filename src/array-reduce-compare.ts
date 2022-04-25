/*
In pure JS:

function reduceCompare(arr, cb, cmp, init) {
    return (function _(acc, i) {
        return i < arr.length && cmp(acc, arr[i], i, arr) === true ? _(cb(acc, arr[i], i, arr), i + 1) : acc;
    })(typeof init !== 'undefined' ? init : arr[0], 0);
}
*/

/**
 * Reduces an array like Array.prototype.reduce, but with an additional compare function to stop the reduction.
 * 
 * @param arr The array to reduce
 * @param cb The callback function for each reduction iteration
 * @param cmp The compare function which decides whether to stop or not
 * @param init The optional intial value. If omitted, the first array element will be taken.
 * @returns The product of the reduction
 */
export default function reduceCompare<A = unknown, B = unknown>(
    arr: Array<A>
    , cb: (
        acc: B
        , curr: A
        , i: number
        , arr: Array<A>
    ) => B
    , cmp: (
        acc: B
        , curr: A
        , i: number
        , arr: Array<A>
    ) => boolean
    , init?: B
): B {
    // testing whether this function was called with the right arguments
    if (typeof arr !== 'object' || !Array.isArray(arr)) {
        throw new Error('First argument of reduceCompare() must be an array.');
    }
    if (typeof cb !== 'function') { throw new Error('Second argument of reduceCompare() must be a function.'); }
    if (typeof cmp !== 'function') { throw new Error('Third argument of reduceCompare() must be a function.'); }
    if (arr.length === 0 && typeof init === 'undefined') { throw new Error(
        'Fourth argument of reduceCompare() cannot be undefined if the first argument is an empty array.'
    ); }

    // now comes the magic!
    return (function _(acc: B, i: number) {
        return i < arr.length && cmp(acc, arr[i], i, arr) === true ? _(cb(acc, arr[i], i, arr), i + 1) : acc;
    })(init ?? arr[0] as unknown as B, 0);
}
