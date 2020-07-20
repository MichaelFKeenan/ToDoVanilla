import AssignedFilter from './assignedFilter'

const CurrentUserId = 3;

const createFilter = (isActive = false, userId = CurrentUserId) => new AssignedFilter({IsActive: isActive, UserId: userId})

test('Filter is inactive by default', () => {
    const assignedFilter = createFilter();
    expect(assignedFilter.Active).toBe(false);
});

test('Filter is Active if passed true', () => {
    const assignedFilter = createFilter(true);
    expect(assignedFilter.Active).toBe(true);
});

describe('given Filter is inactive', () => {
    const assignedFilter = createFilter();

    beforeAll(() => {
        assignedFilter.Active = false;
    })

    test('return true if assigned to current user', () => {
        const item = {
            AssignedToUserId: CurrentUserId,
        }
        expect(assignedFilter.Filter(item)).toBe(true);
    });
    
    test('return true if not assigned to current user', () => {
        const item = {
            AssignedToUserId: 1,
        }
        expect(assignedFilter.Filter(item)).toBe(true);
    });
});

describe('given Filter is Active', () => {
    const assignedFilter = createFilter();

    beforeAll(() => {
        assignedFilter.Active = true;
    })

    test('return true if assigned to current user', () => {
        const item = {
            AssignedToUserId: CurrentUserId,
        }
        expect(assignedFilter.Filter(item)).toBe(true);
    });
    
    test('return false if not assigned to current user', () => {
        const item = {
            AssignedToUserId: 1,
        }
        expect(assignedFilter.Filter(item)).toBe(false);
    });
});
