import CategoryFilter from './categoryFilter'

import categoryService from '../../../services/categoryService.js';
jest.mock('../../../services/categoryService.js', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getAllCategories: async () => [{
                'Id': 1,
                'Name': 'test 1'
            }, {
                'Id': 2,
                'Name': 'test 2'
            }]
        };
    });
});

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