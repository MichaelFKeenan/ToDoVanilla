import HighPriorityFilter from './highPriorityFilter.js'
import CompleteFilter from './completeFilter.js'
import CategoryFilter from './categoryFilter.js'

const filter = { HighPriorityFilter, CompleteFilter, CategoryFilter };

export default {
    createFilter(type, attributes) {
        const FilterType = filter[type];
        return new FilterType(attributes);
    }
};