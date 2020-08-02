import CategoryFilter from './categoryFilter'

const mockAllCategoriesResponse = [{
    'Id': 1,
    'Name': 'test 1'
}, {
    'Id': 2,
    'Name': 'test 2'
}]

test('Filter is all by default', () => {
    const categoryFilter = new CategoryFilter();
    expect(categoryFilter.Value).toBe('All');
});

test('Filter is Value if one is passed', () => {
    const categoryFilter = new CategoryFilter('1');
    expect(categoryFilter.Value).toBe('1');
});

describe('given Value is all', () => {
    const categoryFilter = new CategoryFilter();

    test('return from category 1', () => {
        const item = {
            CategoryId: 1,
        }
        expect(categoryFilter.Filter(item)).toBe(true);
    });

    test('return from category 2', () => {
        const item = {
            CategoryId: 2,
        }
        expect(categoryFilter.Filter(item)).toBe(true);
    });
});

describe('given Value is 1', () => {
    const categoryFilter = new CategoryFilter('1');

    test('return from category 1', () => {
        const item = {
            CategoryId: 1,
        }
        expect(categoryFilter.Filter(item)).toBe(true);
    });

    test('do not return from category 2', () => {
        const item = {
            CategoryId: 2,
        }
        expect(categoryFilter.Filter(item)).toBe(false);
    });
});

describe('given categories are returned', () => {
    const categoryFilter = new CategoryFilter();

    beforeEach(() => {
        (<any>global).fetch = jest.fn().mockImplementation(() => {
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

    test('when asyncCallBack then create Options for each category and all', async () => {
        await categoryFilter.AsyncConnectedCallback();
        expect(categoryFilter.Options).toEqual([
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