import HighPriorityFilter from './highPriorityFilter'
import CompleteFilter from './completeFilter'
import CategoryFilter from './categoryFilter'
import AssignedFilter from './assignedFilter'

const filter = { HighPriorityFilter, CompleteFilter, CategoryFilter, AssignedFilter };

export default {
    createFilter(type, attributes) {
        const FilterType = filter[type];
        return new FilterType(attributes);
    }
};