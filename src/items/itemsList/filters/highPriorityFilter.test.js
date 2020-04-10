import HighPriorityFilter from './highPriorityFilter'

test('filter is inactive by default', () => {
    const highPriorityFilter = new HighPriorityFilter();
    expect(highPriorityFilter.active).toBe(false);
});

test('filter is active if passed true', () => {
    const highPriorityFilter = new HighPriorityFilter(true);
    expect(highPriorityFilter.active).toBe(true);
});

describe('given filter is inactive', () => {
    const highPriorityFilter = new HighPriorityFilter();

    beforeAll(() => {
        highPriorityFilter.active = false;
    })

    test('return true if priority 3 or greater', () => {
        const item = {
            Priority: 3,
        }
        expect(highPriorityFilter.filter(item)).toBe(true);
    });
    
    test('return true if priority less than 3', () => {
        const item = {
            Priority: 1,
        }
        expect(highPriorityFilter.filter(item)).toBe(true);
    });
});

describe('given filter is active', () => {
    const highPriorityFilter = new HighPriorityFilter();

    beforeAll(() => {
        highPriorityFilter.active = true;
    })

    test('return true if priority 2 or greater', () => {
        const item = {
            Priority: 2,
        }
        expect(highPriorityFilter.filter(item)).toBe(true);
    });
    
    test('return false if priority less than 2', () => {
        const item = {
            Priority: 1,
        }
        expect(highPriorityFilter.filter(item)).toBe(false);
    });
});
