import AssignedFilter from './assignedFilter'

const CurrentUserId = 3;

const creatFilter = (isActive = false, userId = CurrentUserId) => new AssignedFilter({isActive, userId})

test('filter is inactive by default', () => {
    const assignedFilter = creatFilter();
    expect(assignedFilter.active).toBe(false);
});

test('filter is active if passed true', () => {
    const assignedFilter = creatFilter(true);
    expect(assignedFilter.active).toBe(true);
});

describe('given filter is inactive', () => {
    const assignedFilter = creatFilter();

    beforeAll(() => {
        assignedFilter.active = false;
    })

    test('return true if assigned to current user', () => {
        const item = {
            AssignedToUserId: CurrentUserId,
        }
        expect(assignedFilter.filter(item)).toBe(true);
    });
    
    test('return true if not assigned to current user', () => {
        const item = {
            AssignedToUserId: 1,
        }
        expect(assignedFilter.filter(item)).toBe(true);
    });
});

describe('given filter is active', () => {
    const assignedFilter = creatFilter();

    beforeAll(() => {
        assignedFilter.active = true;
    })

    test('return true if assigned to current user', () => {
        const item = {
            AssignedToUserId: CurrentUserId,
        }
        expect(assignedFilter.filter(item)).toBe(true);
    });
    
    test('return false if not assigned to current user', () => {
        const item = {
            AssignedToUserId: 1,
        }
        expect(assignedFilter.filter(item)).toBe(false);
    });
});
