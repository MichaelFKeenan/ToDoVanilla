import CompleteFilter from './completeFilter'

test('Filter is inactive by default', () => {
    const completeFilter = new CompleteFilter();
    expect(completeFilter.Active).toBe(false);
});

test('Filter is Active if passed true', () => {
    const completeFilter = new CompleteFilter(true);
    expect(completeFilter.Active).toBe(true);
});

describe('given Filter is inactive', () => {
    const completeFilter = new CompleteFilter();

    beforeAll(() => {
        completeFilter.Active = false;
    })

    test('return true if complete', () => {
        const item = {
            Complete: true,
        }
        expect(completeFilter.Filter(item)).toBe(true);
    });
    
    test('return true if incomplete', () => {
        const item = {
            Complete: false,
        }
        expect(completeFilter.Filter(item)).toBe(true);
    });
});

describe('given Filter is Active', () => {
    const completeFilter = new CompleteFilter();

    beforeAll(() => {
        completeFilter.Active = true;
    })

    test('return true if incomplete', () => {
        const item = {
            Complete: false,
        }
        expect(completeFilter.Filter(item)).toBe(true);
    });
    
    test('return false if complete', () => {
        const item = {
            Complete: true,
        }
        expect(completeFilter.Filter(item)).toBe(false);
    });
});
