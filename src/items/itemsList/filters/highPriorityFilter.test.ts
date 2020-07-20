import HighPriorityFilter from './highPriorityFilter'

test('Filter is inactive by default', () => {
    const highPriorityFilter = new HighPriorityFilter();
    expect(highPriorityFilter.Active).toBe(false);
});

test('Filter is Active if passed true', () => {
    const highPriorityFilter = new HighPriorityFilter(true);
    expect(highPriorityFilter.Active).toBe(true);
});

describe('given Filter is inactive', () => {
    const highPriorityFilter = new HighPriorityFilter();

    beforeAll(() => {
        highPriorityFilter.Active = false;
    })

    test('return true if priority 3 or greater', () => {
        const item = {
            Priority: 3,
        }
        expect(highPriorityFilter.Filter(item)).toBe(true);
    });
    
    test('return true if priority less than 3', () => {
        const item = {
            Priority: 1,
        }
        expect(highPriorityFilter.Filter(item)).toBe(true);
    });
});

describe('given Filter is Active', () => {
    const highPriorityFilter = new HighPriorityFilter();

    beforeAll(() => {
        highPriorityFilter.Active = true;
    })

    test('return true if priority 2 or greater', () => {
        const item = {
            Priority: 2,
        }
        expect(highPriorityFilter.Filter(item)).toBe(true);
    });
    
    test('return false if priority less than 2', () => {
        const item = {
            Priority: 1,
        }
        expect(highPriorityFilter.Filter(item)).toBe(false);
    });
});
