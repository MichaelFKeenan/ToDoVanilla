import FilterItems from './filterService'

describe('given one filter', () => {
    const filters = [
        {
            filter: (item) => {
                return item.filterResult
            }
        }
    ]

    const items = [
        {
            id: 1,
            filterResult: true
        },
        {
            id: 2,
            filterResult: false
        },
        {
            id: 3,
            filterResult: true
        }
    ]

    test('filtering results returns all results that pass the filter', () => {
        const res = FilterItems(items, filters);
        expect(res.length).toBe(2);
        expect(res[0].id).toBe(1);
        expect(res[1].id).toBe(3);
    });
});

describe('given many filters', () => {
    const filters = [
        {
            filter: (item) => {
                return item.filter1Result
            }
        },
        {
            filter: (item) => {
                return item.filter2Result
            }
        }
    ]

    const items = [
        {
            id: 1,
            filter1Result: true,
            filter2Result: false
        },
        {
            id: 2,
            filter1Result: false,
            filter2Result: false
        },
        {
            id: 3,
            filter1Result: true,
            filter2Result: true
        },
        {
            id: 4,
            filter1Result: false,
            filter2Result: true
        },
        {
            id: 5,
            filter1Result: true,
            filter2Result: true
        }
    ]

    test('filtering results returns all results that pass both filters', () => {
        const res = FilterItems(items, filters);
        expect(res.length).toBe(2);
        expect(res[0].id).toBe(3);
        expect(res[1].id).toBe(5);
    });
});