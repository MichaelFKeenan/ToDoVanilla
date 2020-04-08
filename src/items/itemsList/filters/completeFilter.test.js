import CompleteFilter from './completeFilter'

test('filter is inactive by default', () => {
    const completeFilter = new CompleteFilter();
    expect(completeFilter.active).toBe(false);
});

test('filter is active if passed true', () => {
    const completeFilter = new CompleteFilter(true);
    expect(completeFilter.active).toBe(true);
});

describe('given filter is inactive', () => {
    const completeFilter = new CompleteFilter();

    beforeAll(() => {
        completeFilter.active = false;
    })

    test('return true if complete', () => {
        const item = {
            Complete: true,
        }
        expect(completeFilter.filter(item)).toBe(true);
    });
    
    test('return true if incomplete', () => {
        const item = {
            Complete: false,
        }
        expect(completeFilter.filter(item)).toBe(true);
    });
});

describe('given filter is active', () => {
    const completeFilter = new CompleteFilter();

    beforeAll(() => {
        completeFilter.active = true;
    })

    test('return true if incomplete', () => {
        const item = {
            Complete: false,
        }
        expect(completeFilter.filter(item)).toBe(true);
    });
    
    test('return false if complete', () => {
        const item = {
            Complete: true,
        }
        expect(completeFilter.filter(item)).toBe(false);
    });
});
