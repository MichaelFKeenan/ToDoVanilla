import HighPriorityFilter from './highPriorityFilter'

test('filter is inactive by default', () => {
    const highPriorityFilter = new HighPriorityFilter();
    expect(highPriorityFilter.active).toBe(false);
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

    test('return true if priority 3 or greater', () => {
        const item = {
            Priority: 3,
        }
        expect(highPriorityFilter.filter(item)).toBe(true);
    });
    
    test('return false if priority less than 3', () => {
        const item = {
            Priority: 1,
        }
        expect(highPriorityFilter.filter(item)).toBe(false);
    });
});
