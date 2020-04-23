import HighPriorityFilter from './highPriorityFilter.js'
import CompleteFilter from './completeFilter.js'
import CategoryFilter from './categoryFilter.js'
import AssignedFilter from './assignedFilter.js'

const filter = { HighPriorityFilter, CompleteFilter, CategoryFilter, AssignedFilter };

export default {
    createFilter(type, attributes) {
        const FilterType = filter[type];
        return new FilterType(attributes);
    }
};