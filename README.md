# :end::curly_loop: array-reduce-compare

This library provides a way to reduce an array and stop at some point **WITHOUT ANY MUTATIONS**. It does that by not trying to stop the reduction inside of the callback, but by providing a compare function which returns a `boolean`.

[![array-reduce-compare on npmjs.com](https://img.shields.io/npm/v/array-reduce-compare?logo=npm&logoColor=white)](https://www.npmjs.com/package/array-reduce-compare)
[![array-reduce-compare on GitHub](https://img.shields.io/github/package-json/v/StefanJelner/array-reduce-compare?logo=github&logoColor=white)](https://github.com/StefanJelner/array-reduce-compare)
[![array-reduce-compare on jsDelivr](https://data.jsdelivr.com/v1/package/npm/array-reduce-compare/badge?style=rounded)](https://www.jsdelivr.com/package/npm/array-reduce-compare)

---

## Table of contents

- [The problem](#problem)
- [Usage in Vanilla JS](#vanilla-js)
- [Usage in TypeScript (and ES6)](#typescript)
- [Methods](#methods)
- [License](#license)

---

## <a name="problem"></a> The problem

The native [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) has no mechanism, f.ex. like [`break`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/break) to stop the reduction at a given point, but it always iterates over the whole array.

Some people try to overcome this problem by using a [`for`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/for)-loop together with [`break`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/break), which usually makes a lot of mutations necessary.

Some people use [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), but implement a mechanism which uses [Array.prototype.splice()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) to manipulate a clone of the original array, which again contains a mutation.

Some people provide a rewrite which hands over a callback, which sets a variable in the outer scope, so the whole process stops, returning the result. This still mutates a variable in the outer scope.

A final - and rather funny - approach is to use [`throw`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/throw) in a [`try...catch`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/try...catch)-block and stop the reduction this way, which works without any mutations, but abuses a mechanism with many unwanted side effects. It has a smell of "don't do this at home"!

For the discussion see Stackoverflow:
https://stackoverflow.com/questions/36144406/how-to-early-break-reduce-method

This library provides a complete recursive rewrite, which calls a compare function before every new recursion, checking whether to stop or not. The approach is completely mutations free and clean. No hacks or workarounds required.

---

## <a name="vanilla-js"></a> Usage in Vanilla JS

Copy the file `/dist/array-reduce-compare.iife.min.js` and add the following to your HTML:

```html
<script src="array-reduce-compare.iife.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        var arr = ['a', 'b', 'c', 'd'];

        function join(acc, curr) {
            return acc + curr;
        }

        console.log(reduceCompare(arr, join, function(acc) { return acc.length < 1; }, '')); // logs 'a'

        console.log(reduceCompare(arr, join, function(acc, curr) { return curr !== 'c'; }, '')); // logs 'ab'

        console.log(reduceCompare(arr, join, function(acc, curr, i) { return i < 4; }, '')); // logs 'abc'

        // same as the native Array.prototype.reduce(), so try to avoid doing this
        console.log(reduceCompare(arr, join, function() { return true; }, '')); // logs 'abcd'
    });
</script>
```

Alternatively you can use a CDN like [UNPKG](https://unpkg.com) or [jsDelivr](https://www.jsdelivr.com/):

```html
<script src="https://unpkg.com/array-reduce-compare/dist/array-reduce-compare.iife.min.js"></script>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/array-reduce-compare/dist/array-reduce-compare.iife.min.js"></script>
```

---

## <a name="typescript"></a> Usage in TypeScript (and ES6)

```ts
import reduceCompare from 'node_modules/array-reduce-compare';

document.addEventListener('DOMContentLoaded', () => {
    const arr: Array<string> = ['a', 'b', 'c', 'd'];

    function join(acc: string, curr: string): string {
        return acc + curr;
    }

    console.log(reduceCompare(arr, join, (acc: string): boolean => acc.length < 1, '')); // logs 'a'

    console.log(reduceCompare(arr, join, (acc: string, curr: string): boolean => curr !== 'c', '')); // logs 'ab'

    console.log(reduceCompare(arr, join, (acc: string, curr: string, i: number): boolean => i < 4, '')); // logs 'abc'

    // same as the native Array.prototype.reduce(), so try to avoid doing this
    console.log(reduceCompare(arr, join, (): boolean => true, '')); // logs 'abcd'
});
```

---

## <a name="methods"></a> Methods

### `reduceCompare`

```ts
function reduceCompare<A = unknown, B = unknown>(
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
): B;
```

The function arguments `arr` for the array, `cb` for the callback and `init` for the initial value are the same as the ones in [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). The function also throws the same errors in the same situations.

The only new argument is the third argument `cmp`, which is the compare function. It accepts the same argument as the callback function `cb`. If it is undefined or does not have the type `function`, an error will be thrown. `cmp` **MUST** return a `boolean`, which indicates, whether to continue the reduction or not.

---

## <a name="license"></a> License

This software is brought to you with :heart: **love** :heart: from Dortmund and offered and distributed under the ISC license. See `LICENSE.txt` and [Wikipedia](https://en.wikipedia.org/wiki/ISC_license) for more information.
