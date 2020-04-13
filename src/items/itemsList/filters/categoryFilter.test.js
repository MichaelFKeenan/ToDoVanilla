import CategoryFilter from './categoryFilter'

const mockAllCategoriesResponse = [{
    'Id': 1,
    'Name': 'test 1'
}, {
    'Id': 2,
    'Name': 'test 2'
}]

test('filter is all by default', () => {
    const categoryFilter = new CategoryFilter();
    expect(categoryFilter.value).toBe('All');
});

test('filter is value if one is passed', () => {
    const categoryFilter = new CategoryFilter('1');
    expect(categoryFilter.value).toBe('1');
});

describe('given value is all', () => {
    const categoryFilter = new CategoryFilter();

    test('return from category 1', () => {
        const item = {
            CategoryId: 1,
        }
        expect(categoryFilter.filter(item)).toBe(true);
    });

    test('return from category 2', () => {
        const item = {
            CategoryId: 2,
        }
        expect(categoryFilter.filter(item)).toBe(true);
    });
});

describe('given value is 1', () => {
    const categoryFilter = new CategoryFilter('1');

    test('return from category 1', () => {
        const item = {
            CategoryId: 1,
        }
        expect(categoryFilter.filter(item)).toBe(true);
    });

    test('do not return from category 2', () => {
        const item = {
            CategoryId: 2,
        }
        expect(categoryFilter.filter(item)).toBe(false);
    });
});

describe('given categories are returned', () => {
    const categoryFilter = new CategoryFilter();

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(() => {
            var response = new Promise((resolve, reject) => {
              resolve({
                ok: true, 
                json: function() { 
                  return mockAllCategoriesResponse
                }
              });
            });
      
            return response;
        });
    })

    test('when asyncCallBack then create options for each category and all', async () => {
        await categoryFilter.asyncConnectedCallback();
        expect(categoryFilter.options).toEqual([
            {
                value: "All",
                display: "All"
            },
            {
                value: mockAllCategoriesResponse[0].Id,
                display: mockAllCategoriesResponse[0].Name
            },
            {
                value: mockAllCategoriesResponse[1].Id,
                display: mockAllCategoriesResponse[1].Name
            }
        ]);
    });
});