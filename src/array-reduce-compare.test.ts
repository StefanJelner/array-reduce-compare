import reduceCompare from './array-reduce-compare';

function join(acc: string, curr: string): string {
    return acc + curr;
}

describe('reduceCompare', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const obj = {
        'a': 'b'
        , 'b': 'c'
        , 'c': 'd'
        , 'd': 'e'
    };

    it('should reduce to the right string with several compare functions', () => {
        expect(
            reduceCompare<string, string>(
                arr
                , join
                , (acc: string): boolean => acc.length < 1
                , ''
            )
        ).toBe('a');

        expect(
            reduceCompare<string, string>(
                arr
                , join
                , (acc: string, curr: string): boolean => curr !== 'c'
                , ''
            )
        ).toBe('ab');

        expect(
            reduceCompare<string, string>(
                arr
                , join
                , (acc: string, curr: string, i: number): boolean => i < 3
                , ''
            )
        ).toBe('abc');

        expect(
            reduceCompare<string, string>(
                arr
                , join
                , (): boolean => true
                , ''
            )
        ).toBe('abcd');

        expect(
            reduceCompare<string, string>(
                arr
                , join
                , (): boolean => true
            )
        ).toBe('aabcd');

        expect(
            reduceCompare<string, Record<string, string>>(
                Object.keys(obj)
                , (acc: Record<string, string>, key: string) => ({
                    ...acc
                    , [obj[key]]: key
                })
                , (_, key: string): boolean => key !== 'd'
                , {}
            )
        ).toEqual({
            'b': 'a'
            , 'c': 'b'
            , 'd': 'c'
        });
    });

    it('should throw exceptions if invalid data is provided', () => {
        expect(() => (reduceCompare as any)(null)).toThrow(
            new Error('First argument of reduceCompare() must be an array.')
        );

        expect(() => (reduceCompare as any)([], null)).toThrow(
            new Error('Second argument of reduceCompare() must be a function.')
        );

        expect(() => (reduceCompare as any)([], () => {}, null)).toThrow(
            new Error('Third argument of reduceCompare() must be a function.')
        );

        expect(() => (reduceCompare as any)([], () => {}, () => {})).toThrow(
            new Error(
                'Fourth argument of reduceCompare() cannot be undefined if the first argument is an empty array.'
            )
        );
    });
});
