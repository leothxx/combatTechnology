import { reactive, computed } from 'vue';

export function useTableView(data, options) {
    const state = reactive({
        currentPage: 1,
        pageSize: options.pageSize || 10,
        sortColumn: options.sortColumn || null,
        sortOrder: options.sortOrder || 'asc',
        filters: options.filters || {}
    });

    const filteredData = computed(() => {
        const raw = data.value || []; // undefined 방지
        return raw.filter(row =>
            Object.keys(state.filters).every(col => {
                if (!state.filters[col]) return true;
                return String(row[col]).toLowerCase().includes(state.filters[col].toLowerCase());
            })
        );
    });


    const sortedData = computed(() => {
        if (!state.sortColumn) return filteredData.value;
        return [...filteredData.value].sort((a, b) => {
            const valA = a[state.sortColumn];
            const valB = b[state.sortColumn];
            if (valA === valB) return 0;
            if (state.sortOrder === 'asc') return valA > valB ? 1 : -1;
            return valA < valB ? 1 : -1;
        });
    });

    const pagedData = computed(() => {
        const start = (state.currentPage - 1) * state.pageSize;
        return sortedData.value.slice(start, start + state.pageSize);
    });

    const totalPages = computed(() => {
        return Math.ceil(sortedData.value.length / state.pageSize);
    });

    function setSort(column) {
        if (state.sortColumn === column) {
            state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            state.sortColumn = column;
            state.sortOrder = 'asc';
        }
    }

    function setFilter(column, value) {
        state.filters[column] = value;
        state.currentPage = 1;
    }

    function goToPage(page) {
        state.currentPage = page;
    }

    return {
        state,
        pagedData,
        totalPages,
        setSort,
        setFilter,
        goToPage
    };
}