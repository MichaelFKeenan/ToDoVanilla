import FilterItems from './filterService'

const CreateItem = (Id: number, Complete: boolean, CategoryId: number = 1): Item => {
    return {
        Id,
        Name: "any",
        Complete,
        Priority: 1,
        CategoryId,
        AssignedToUserId: 1,
        Description: "any",
        Effort: 1,
        CompleteBy: "any",
        UserId: 1
    }
}

describe('given one filter', () => {
    const filters = [
        {
            filter: (item: Item) => {
                return item.Complete
            }
        }
    ]

    const items : Item[] = [
        CreateItem(1, true),
        CreateItem(2, false),
        CreateItem(3, true),
    ]

    test('filtering results returns all results that pass the filter', () => {
        const res = FilterItems(items, filters);
        expect(res.length).toBe(2);
        expect(res[0].Id).toBe(1);
        expect(res[1].Id).toBe(3);
    });
});

describe('given many filters', () => {
    const filters = [
        {
            filter: (item: any) => {
                return item.Complete
            }
        },
        {
            filter: (item: any) => {
                return item.CategoryId == 2
            }
        }
    ]

    const items = [
        CreateItem(1, true),
        CreateItem(2, false),
        CreateItem(3, true, 2),
        CreateItem(4, false, 2),
        CreateItem(5, true, 2)
    ]

    test('filtering results returns all results that pass both filters', () => {
        const res = FilterItems(items, filters);
        expect(res.length).toBe(2);
        expect(res[0].Id).toBe(3);
        expect(res[1].Id).toBe(5);
    });
});